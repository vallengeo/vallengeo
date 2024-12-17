package com.vallengeo.portal.service;

import com.vallengeo.core.exceptions.InvalidPasswordException;
import com.vallengeo.core.exceptions.custom.UnauthorizedException;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.portal.model.*;
import com.vallengeo.portal.model.embeddable.RelUsuarioPerfilTelaPermissao;
import com.vallengeo.portal.payload.request.usuario.CadastroRequest;
import com.vallengeo.portal.payload.request.usuario.CadastroSimplificadoRequest;
import com.vallengeo.portal.payload.request.usuario.EsqueciMinhaSenhaRequest;
import com.vallengeo.portal.payload.request.usuario.RedefinirSenhaRequest;
import com.vallengeo.portal.payload.response.UsuarioResponse;
import com.vallengeo.portal.repository.UsuarioPerfilTelaPermissaoRepository;
import com.vallengeo.portal.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.vallengeo.core.helpers.DateHelpers.convertDateToLocalDateTime;
import static com.vallengeo.core.util.Constants.INVALID_PASSWORD;
import static com.vallengeo.core.util.Constants.NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final UsuarioPerfilTelaPermissaoRepository usuarioPerfilTelaPermissaoRepository;

    private final EmailService emailService;

    @Value("${usuario.codigoAcesso.validade.minutos}")
    private long validadeCodigoAcesso;

    public List<UsuarioResponse> buscaTodos() {
        return usuarioRepository.findAll().stream().map(this::montaUsuarioResponse).toList();
    }

    public Optional<UsuarioResponse> buscarPorId(UUID id) {
       return usuarioRepository.findById(id).map(this::montaUsuarioResponse);
    }

    public void cadastroSimplificado(CadastroSimplificadoRequest input) {
        Usuario usuario = Usuario.builder()
                .email(input.email())
                .dataCadastro(convertDateToLocalDateTime(new Date()))
                .ativo(Boolean.FALSE)
                .perfis(montaPerfil(input.perfis()))
                .grupos(montaGrupo(input.grupos()))
                .build();
        usuarioRepository.save(usuario);
        emailService.enviarEmailCriacaoConta(usuario, input.modulo());
    }

    @Transactional
    public void cadastro(CadastroRequest input) {
        Usuario usuario = Usuario.builder()
                .email(input.email())
                .dataCadastro(convertDateToLocalDateTime(new Date()))
                .ativo(Boolean.FALSE)
                .perfis(montaPerfil(input.perfis()))
                .grupos(montaGrupo(input.grupos()))
                .build();

        usuarioPerfilTelaPermissaoRepository.saveAll(montaPermissao(usuarioRepository.save(usuario), input.telas()));
        emailService.enviarEmailCriacaoConta(usuario, input.modulo());
    }

    @Transactional
    public void esqueciMinhaSenha(EsqueciMinhaSenhaRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.email())
                .orElseThrow(
                        () -> new ValidatorException("Usuário do email " + request.email() + NOT_FOUND, HttpStatus.NOT_FOUND));

        usuarioRepository.save(this.sendEmailRedefinirSenha(usuario, request.modulo()));
    }

    @Transactional
    public void redefinirSenha(RedefinirSenhaRequest request) {
        if (validarSenha(request.senha())) {
            log.info("Reset user password for reset key {}", request.codigoAcesso());
            Optional<Usuario> usuarioOptional = usuarioRepository.findByCodigoAcesso(request.codigoAcesso());

            usuarioOptional.ifPresentOrElse(usuario -> {
                        if (usuario.getValidadeCodigo().isAfter(LocalDateTime.now().minusMinutes(validadeCodigoAcesso))) {
                            usuario.setSenhaHash(new BCryptPasswordEncoder().encode(request.senha()));
                            usuario.setCodigoAcesso(null);
                            usuario.setValidadeCodigo(null);
                            usuario.setAtivo(Boolean.TRUE);
                            usuario.setDataAtualizacao(convertDateToLocalDateTime(new Date()));
                        } else {
                            throw new UnauthorizedException("Código de acesso expirado.");
                        }
                    },
                    () -> {
                        throw new ValidatorException("Usuário com o código de acesso " + request.codigoAcesso() + NOT_FOUND, HttpStatus.NOT_FOUND);
                    }
            );

        } else {
            throw new InvalidPasswordException(INVALID_PASSWORD);
        }
    }

    private UsuarioResponse montaUsuarioResponse(Usuario usuario){
        List<UsuarioResponse.Perfil> perfis = usuario.getPerfis().stream()
                .map(perfil -> new UsuarioResponse.Perfil(perfil.getCodigo()))
                .distinct().toList();

        List<UsuarioResponse.Grupo> grupos = usuario.getGrupos().stream()
                .map(grupo -> new UsuarioResponse.Grupo(grupo.getCodigo()))
                .distinct().toList();

        var telas = usuario.getPermissoes().stream().map(Permissao::getTela).distinct()
                .map(tela -> new UsuarioResponse.Tela(
                        tela.getCodigo(),
                        usuario.getPermissoes().stream().filter(permissao -> permissao.getTela().getId().equals(tela.getId()))
                                .map(permissao -> new UsuarioResponse.Permissao(permissao.getCodigo()))
                                .distinct()
                                .toList()
                ))
                .distinct().toList();

        return new UsuarioResponse(
                usuario.getId().toString(),
                usuario.getEmail(),
                usuario.getAtivo(),
                perfis,
                grupos,
                telas
        );
    }

    private List<Perfil> montaPerfil(List<CadastroSimplificadoRequest.Perfil> perfis) {
        return perfis.stream()
                .map(p -> Perfil.builder().id(UUID.fromString(p.id())).build())
                .toList();
    }

    private List<Grupo> montaGrupo(List<CadastroSimplificadoRequest.Grupo> grupos) {
        return grupos.stream()
                .map(g -> Grupo.builder().id(UUID.fromString(g.id())).build())
                .toList();
    }

    private List<UsuarioPerfilTelaPermissao> montaPermissao(Usuario usuario, List<CadastroRequest.Tela> telas) {
        List<UsuarioPerfilTelaPermissao> list = new ArrayList<>();

        for (Perfil perfil : usuario.getPerfis()) {
            for (CadastroRequest.Tela tela : telas) {
                for (CadastroRequest.Permissao permissao : tela.permissoes()) {
                    list.add(UsuarioPerfilTelaPermissao.builder()
                            .relUsuarioPerfilTelaPermissao(
                                    RelUsuarioPerfilTelaPermissao.builder()
                                            .idUsuario(usuario.getId())
                                            .idPerfil(perfil.getId())
                                            .idTela(UUID.fromString(tela.id()))
                                            .codigoPermissao(permissao.codigo())
                                            .build())
                            .build()
                    );
                }

            }
        }
        return list;
    }

    private String geraSenhaCodigo(int tamanho) {
        return new RandomString(tamanho).nextString();
    }

    private Usuario sendEmailRedefinirSenha(Usuario usuario, String modulo) {
        setCodigoAcesso(usuario);
        emailService.enviaEmailRedefinirSenha(usuario, modulo);
        return usuario;

    }

    private void setCodigoAcesso(Usuario usuario) {
        usuario.setCodigoAcesso(geraSenhaCodigo(6));
        usuario.setValidadeCodigo(convertDateToLocalDateTime(new Date()).plusMinutes(validadeCodigoAcesso));
    }

    private static boolean validarSenha(String senha) {
        String regex = "^(?=.*\\d)(?=.*[a-zA-Z]).{6,}$";

        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(senha);

        return matcher.matches();
    }


}

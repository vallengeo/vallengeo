package com.vallengeo.portal.security.jwt;

import com.vallengeo.portal.model.*;
import io.jsonwebtoken.Claims;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Getter
@EqualsAndHashCode
public class JwtUserResponse {
    private String id;
    private String nome;
    private String primeiroNome;
    private String email;
    private Boolean ativo;
    private String idGrupo;
    private List<String> grupos;
    private List<String> telas;
    private List<String> perfis;
    private List<String> permissoes;

    public JwtUserResponse(UserDetails userDetails, String idGrupo) {

        if (userDetails instanceof Usuario usuario) {
            String nome = usuario.getEmail();
            String primeiroNome = usuario.getEmail();

            if (Objects.nonNull(usuario.getPessoa())) {
                if (usuario.getPessoa() instanceof PessoaFisica pessoaFisica) {
                    nome = pessoaFisica.getNome();
                    primeiroNome = Arrays.stream(pessoaFisica.getNome().split(" ")).findFirst().orElse(usuario.getEmail());
                } else {
                    PessoaJuridica pessoaJuridica = (PessoaJuridica) usuario.getPessoa();
                    nome = pessoaJuridica.getResponsavel().getNome();
                    primeiroNome = Arrays.stream(pessoaJuridica.getResponsavel().getNome().split(" ")).findFirst().orElse(usuario.getEmail());
                }

            }

            this.id = usuario.getId().toString();
            this.nome = nome;
            this.primeiroNome = primeiroNome;
            this.email = usuario.getEmail();
            this.ativo = usuario.getAtivo();
            this.idGrupo = usuario.getGrupos().stream().anyMatch(grupo -> grupo.getId().toString().equals(idGrupo)) ? idGrupo : null;
            this.grupos = usuario.getGrupos().stream().map(Grupo::getCodigo).sorted().toList();
            this.telas = usuario.getPermissoes().stream().map(Permissao::getTela).distinct().map(Tela::getCodigo).sorted().toList();
            this.perfis = usuario.getPerfis().stream().map(Perfil::getCodigo).sorted().toList();
            this.permissoes = usuario.getPermissoes().stream().map(Permissao::getCodigo).sorted().toList();

        }
    }

    public JwtUserResponse(Claims claims) {
        if (claims != null) {

            Map user = claims.get("user", Map.class);

            this.id = user.getOrDefault("id", null).toString();
            this.nome = user.getOrDefault("nome", null).toString();
            this.primeiroNome = user.getOrDefault("primeiroNome", null).toString();
            this.email = user.getOrDefault("email", null).toString();
            this.ativo = (Boolean) user.getOrDefault("ativo", false);
            this.idGrupo = user.getOrDefault("idGrupo", null).toString();
            this.grupos = (List<String>) user.getOrDefault("grupos", new ArrayList<String>());
            this.telas = (List<String>) user.getOrDefault("telas", new ArrayList<String>());
            this.perfis = (List<String>) user.getOrDefault("perfis", new ArrayList<String>());
            this.permissoes = (List<String>) user.getOrDefault("permissoes", new ArrayList<String>());
        }
    }
}

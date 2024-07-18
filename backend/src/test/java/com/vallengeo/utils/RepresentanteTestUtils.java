package com.vallengeo.utils;

import com.vallengeo.cidadao.payload.request.imovel.RepresentanteRequest;
import com.vallengeo.portal.enumeration.TipoPessoaEnum;

public class RepresentanteTestUtils {

    public static RepresentanteRequest.PessoaFisicaRequest getRepresentantePessoaFisicaRequest() {
        var contato = getContato();
        contato.setOutro(false);
        contato.setRepresentanteLegal(false);
        contato.setResponsavelTecnico(true);

        var representante = new RepresentanteRequest.PessoaFisicaRequest();

        representante.setEndereco(EnderecoTestUtils.getEnderecoRequest());
        representante.setContato(contato);
        representante.setTipoPessoa(TipoPessoaEnum.FISICA);
        representante.setEmail("representante.fisica@gmail.com");
        representante.setTelefone("11987456325");
        representante.setRg("441867510");
        representante.setCpf("34736087340");
        representante.setNome("Representante");

        return representante;
    }

    public static RepresentanteRequest.PessoaJuridicaRequest getRepresentantePessoaJuridicaRequest() {
        var contato = getContato();
        contato.setOutro(false);
        contato.setRepresentanteLegal(false);
        contato.setResponsavelTecnico(true);

        var representante = new RepresentanteRequest.PessoaJuridicaRequest();

        representante.setEndereco(EnderecoTestUtils.getEnderecoRequest());
        representante.setContato(contato);
        representante.setTipoPessoa(TipoPessoaEnum.JURIDICA);
        representante.setEmail("representante.juridico@gmail.com");
        representante.setTelefone("11987456325");
        representante.setRazaoSocial("Pessoa Juridica LTDA");
        representante.setCnpj("47217253000185");
        representante.setResponsavel(getRepresentantePessoaFisicaRequest());

        return representante;
    }

    public static RepresentanteRequest.Contato getContato() {
        var contato = new RepresentanteRequest.Contato();
        contato.setNome("Contato Representante");
        contato.setEmail("representante.contato@gmail.com");
        contato.setTelefone("11987456325");
        contato.setDocumento("34736087340");

        return contato;
    }
}
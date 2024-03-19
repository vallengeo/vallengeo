package com.vallengeo.global.repository;

import com.vallengeo.global.model.Endereco;
import com.vallengeo.global.model.Municipio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, Long> {
    Optional<Endereco> findByCepAndLogradouroAndNumeroAndBairro(String cep, String logradouro, String numero, String bairro);
    boolean existsByCepAndLogradouroAndNumeroAndBairro(String cep, String logradouro, String numero, String bairro);
}
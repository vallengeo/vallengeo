package com.vallengeo.core.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Data
public class Paginacao {

    @Getter
    @AllArgsConstructor
    public enum Direcao {
        ASC("ascending"),
        DESC("descending");

        private final String descricao;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PaginacaoInput {
        private int pagina;
        private int itensPorPagina;
        private String ordernarPor;
        private Direcao direcao;

        public PaginacaoInput(int pagina, int itensPorPagina, String ordernarPor, String direcao) {
            this.pagina = pagina;
            this.itensPorPagina = itensPorPagina;
            this.ordernarPor = ordernarPor;
            this.direcao = Objects.isNull(direcao) ? Direcao.DESC : Arrays.stream(Direcao.values()).filter(dir -> dir.descricao.equalsIgnoreCase(direcao)).findFirst().orElse(Direcao.DESC);
        }
    }

    @Data
    @NoArgsConstructor
    public static class PaginacaoOutput<T> {
        private List<T> conteudo;
        private Long total;
        private int totalPaginas;
        private int pagina;
        private int itensPorPagina;

        public PaginacaoOutput(List<T> conteudo, Page<?> page) {
            this.conteudo = conteudo;
            this.total = page.getTotalElements();
            this.totalPaginas = page.getTotalPages() > 1 ? page.getTotalPages() - 1 : page.getTotalPages();
            this.pagina = page.getPageable().getPageNumber();
            this.itensPorPagina = page.getPageable().getPageSize();
        }
    }

    public static PageRequest montarPaginacaoPageRequest(PaginacaoInput paginacaoInput) {
        Sort sort = Sort.by(paginacaoInput.getOrdernarPor()).descending();
        if (Objects.nonNull(paginacaoInput.getDirecao()) && paginacaoInput.getDirecao().equals(Paginacao.Direcao.ASC))
            sort = sort.ascending();
        return PageRequest.of(paginacaoInput.getPagina(), paginacaoInput.getItensPorPagina(), sort);
    }
}

package com.vallengeo.cidadao.controller;

import com.vallengeo.cidadao.payload.response.GeometriaPorAquivoResponse;
import com.vallengeo.cidadao.service.GeorreferenciamentoService;
import com.vallengeo.core.util.Constants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

import static com.vallengeo.core.util.Constants.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/georreferenciamento")
@Tag(name = "Georreferenciamento", description = "Operação referente ao georreferenciamento")
@SecurityRequirement(name = "bearerAuth")
public class GeorreferenciamentoController {
}

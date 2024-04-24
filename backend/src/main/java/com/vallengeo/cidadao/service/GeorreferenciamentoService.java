package com.vallengeo.cidadao.service;

import com.vallengeo.cidadao.enumeration.CamadaCategoriaEnum;
import com.vallengeo.cidadao.payload.response.GeometriaPorAquivoResponse;
import com.vallengeo.cidadao.payload.response.GeorreferenciamentoInformacoesImovelResponse;
import com.vallengeo.core.exceptions.InvalidFileException;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.core.util.Constants;
import com.vallengeo.core.util.FeatureJsonUtil;
import com.vallengeo.core.util.SecurityUtils;
import com.vallengeo.global.model.Camada;
import com.vallengeo.global.payload.response.EnderecoViaCepResponse;
import com.vallengeo.global.payload.response.geoserver.GeorreferenciamentoFeatureColletionResponse;
import com.vallengeo.global.service.ArquivoService;
import com.vallengeo.global.service.GeoserverService;
import com.vallengeo.global.service.LocalidadeService;
import com.vallengeo.portal.repository.GrupoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.geotools.data.DataStore;
import org.geotools.data.DataStoreFinder;
import org.geotools.data.FeatureSource;
import org.geotools.feature.FeatureCollection;
import org.geotools.feature.FeatureIterator;
import org.geotools.referencing.CRS;
import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.io.ParseException;
import org.locationtech.jts.io.WKTReader;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;
import org.opengis.filter.Filter;
import org.opengis.referencing.FactoryException;
import org.opengis.referencing.crs.CoordinateReferenceSystem;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

import static com.vallengeo.core.util.Constants.GEOMETRY_WHITHOUT_INTERSECTS;

@Slf4j
@Service
@RequiredArgsConstructor
public class GeorreferenciamentoService {
    private final ArquivoService arquivoService;
    private final GeoserverService geoserverService;
    private final LocalidadeService localidadeService;
    private final GrupoRepository grupoRepository;

    public GeometriaPorAquivoResponse obterGeometriaPorShapeFile(MultipartFile file, HttpServletRequest request) {
        try {
            if (!Objects.equals(FilenameUtils.getExtension(file.getOriginalFilename()), "zip")) {
                throw new InvalidFileException(Constants.FILE_INVALID_ERROR);
            }

            List<String> listGeometrias = handlerShapefile(file);

            if (listGeometrias.isEmpty()) {
                throw new InvalidFileException(Constants.FILE_INVALID_ERROR);
            } else if (listGeometrias.size() > 1) {
                throw new InvalidFileException(Constants.COUNT_FILE_INVALID_ERROR);
            }

            String primeiraGeometria = listGeometrias.get(0);
            Geometry geometry = parseGeometria(primeiraGeometria);

            // verifica se está contido no grupo
            contidoNoGrupo(request, geometry);

            return GeometriaPorAquivoResponse.builder()
                    .geometria(geometry)
                    .informacoesImovel(montaGeorreferenciamentoInformacoesImovel(request, geometry))
                    .build();
        } catch (IOException | FactoryException ex) {
            throw new InvalidFileException(Constants.FILE_INVALID_ERROR);
        } catch (ParseException ex) {
            throw new InvalidFileException("Falha ao analisar a geometria do arquivo.");
        }
    }

    private GeorreferenciamentoInformacoesImovelResponse montaGeorreferenciamentoInformacoesImovel(HttpServletRequest request, Geometry geometry) {
        GeorreferenciamentoInformacoesImovelResponse output = new GeorreferenciamentoInformacoesImovelResponse();

        buscaCamadasPeloGrupo(request)
                .stream().filter(camada ->
                        camada.getCategoria().getCodigo().equals(CamadaCategoriaEnum.EDIFICACAO.name()))
                .forEach(camada -> geoserverService.buscaInterseccao(geometry, camada.getCodigo())
                        .getFeatures()
                        .stream()
                        .findFirst().ifPresent(feature -> {
                            GeorreferenciamentoFeatureColletionResponse.Feature.Propriedade properties = feature.getProperties();

                            //INFORMACAO
                            EnderecoViaCepResponse endereco = localidadeService.buscarViaCep(properties.getCd_cep());

                            output.setInformacaoImovel(GeorreferenciamentoInformacoesImovelResponse.InformacaoImovel.builder()
                                    .endereco(GeorreferenciamentoInformacoesImovelResponse.InformacaoImovel.Endereco.builder()
                                            .cep(properties.getCd_cep())
                                            .logradouro(Objects.nonNull(properties.getNm_endereco()) ? properties.getNm_endereco() : endereco.logradouro())
                                            .numero(properties.getCd_numero())
                                            .bairro(Objects.nonNull(properties.getNm_bairro()) ? properties.getNm_bairro() : endereco.bairro())
                                            .idMunicipio(endereco.municipio().id())
                                            .nomeMunicipio(endereco.municipio().nome())
                                            .siglaUf(endereco.municipio().estado().uf())
                                            .build())
                                    .build()
                            );

                            // CARACTERIZACAO
                            String[] inscricao = properties.getCd_inscricao_unidade().split("\\.");
                            GeorreferenciamentoInformacoesImovelResponse.CaracterizacaoImovel caracterizacaoImovel = new GeorreferenciamentoInformacoesImovelResponse.CaracterizacaoImovel();

                            if (inscricao.length >= 3) {
                                caracterizacaoImovel.setSetor(Objects.nonNull(inscricao[0]) ? inscricao[0] : "");
                                caracterizacaoImovel.setQuadra(Objects.nonNull(inscricao[1]) ? inscricao[1] : "");
                                caracterizacaoImovel.setLote(Objects.nonNull(inscricao[2]) ? inscricao[2] : "");
                                caracterizacaoImovel.setUnidade(Objects.nonNull(inscricao[3]) ? inscricao[3] : "");
                            }
                            caracterizacaoImovel.setAreaTerreno(properties.getVl_area_terreno());
                            caracterizacaoImovel.setTestadaPrincipal(properties.getVl_testada());

                            output.setCaracterizacaoImovel(caracterizacaoImovel);
                        }));


        return output;
    }

    private Geometry parseGeometria(String geometriaString) throws ParseException {
        WKTReader reader = new WKTReader();
        Geometry geometria = reader.read(geometriaString);
        geometria.setSRID(4674);
        return FeatureJsonUtil.checkAndConvertMultiPolygonToPolygon(geometria);
    }

    private List<String> handlerShapefile(MultipartFile file) throws IOException, FactoryException {
        List<String> filesPath = arquivoService.filesUnzipped(file);

        // Verifica se todos os arquivos necessários estão presentes no shapefile
        boolean hasShp = filesPath.stream().anyMatch(path -> FilenameUtils.getExtension(path).equals("shp"));
        boolean hasPrj = filesPath.stream().anyMatch(path -> FilenameUtils.getExtension(path).equals("prj"));
        boolean hasDbf = filesPath.stream().anyMatch(path -> FilenameUtils.getExtension(path).equals("dbf"));

        if (!hasShp || !hasPrj || !hasDbf) {
            throw new InvalidFileException(Constants.FILE_INVALID_ERROR);
        }

        // Encontra o caminho do arquivo .prj
        String prjPath = filesPath.stream()
                .filter(path -> FilenameUtils.getExtension(path).equals("prj"))
                .findFirst().orElseThrow(() -> new InvalidFileException(Constants.FILE_INVALID_ERROR));

        // Encontra o caminho do arquivo .shp
        String shpPath = filesPath.stream()
                .filter(path -> FilenameUtils.getExtension(path).equals("shp"))
                .findFirst().orElseThrow(() -> new InvalidFileException(Constants.FILE_INVALID_ERROR));

        // Lê o conteúdo do arquivo .prj para obter o CRS
        String content = Files.readString(Paths.get(prjPath), StandardCharsets.UTF_8);
        CoordinateReferenceSystem crs = CRS.parseWKT(content);

        // Verifica se o CRS é válido (SIRGAS 2000)
        if (!crs.getName().toString().contains("SIRGAS 2000") && !crs.getName().toString().contains("SIRGAS_2000")) {
            throw new InvalidFileException(Constants.FILE_INVALID_ERROR);
        }

        // Retorna as features do arquivo .shp
        return getFeaturesFromShpFile(shpPath);
    }

    private List<String> getFeaturesFromShpFile(String shpPath) {
        List<String> geometries = new ArrayList<>();
        DataStore dataStore = null;

        try {
            // Abrindo o DataStore
            Map<String, Object> map = new HashMap<>();
            map.put("url", new File(shpPath).toURI().toURL());
            dataStore = DataStoreFinder.getDataStore(map);

            if (dataStore == null) {
                throw new IOException("Failed to open DataStore for shapefile: " + shpPath);
            }

            String typeName = dataStore.getTypeNames()[0];
            FeatureSource<SimpleFeatureType, SimpleFeature> source = dataStore.getFeatureSource(typeName);

            if (source == null) {
                throw new IOException("Failed to get FeatureSource for shapefile: " + shpPath);
            }

            Filter filter = Filter.INCLUDE;
            FeatureCollection<SimpleFeatureType, SimpleFeature> collection = source.getFeatures(filter);

            try (FeatureIterator<SimpleFeature> features = collection.features()) {
                while (features.hasNext()) {
                    SimpleFeature feature = features.next();
                    geometries.add(feature.getDefaultGeometry().toString());
                }
            }
        } catch (Exception e) {
            throw new InvalidFileException(Constants.FILE_INVALID_ERROR);
        } finally {
            // Fechando o DataStore manualmente
            if (dataStore != null) {
                dataStore.dispose();
            }
        }

        return geometries;
    }

    private List<Camada> buscaCamadasPeloGrupo(HttpServletRequest request) {
        return grupoRepository.findById(Objects.requireNonNull(SecurityUtils.extractGrupoId(request)))
                .orElseThrow(() -> new ValidatorException("Não foi possível encontrar o grupo.", HttpStatus.NOT_FOUND)).getCamadas();
    }

    private void contidoNoGrupo(HttpServletRequest request, Geometry geometria) {
        String camadaMunicipal = buscaCamadasPeloGrupo(request)
                .stream().filter(camada -> camada.getCategoria().getCodigo().equals(CamadaCategoriaEnum.LIMITE_MUNICIPAL.name())).findFirst()
                .orElseThrow(() -> new ValidatorException("Não foi possível encontrar a camada municipal do grupo.", HttpStatus.NOT_FOUND)).getCodigo();

        GeorreferenciamentoFeatureColletionResponse retorno = geoserverService.contidoNaCamadaDoGrupo(geometria, camadaMunicipal);

        if (Objects.isNull(retorno) || retorno.getFeatures().isEmpty()) {
            log.error(GEOMETRY_WHITHOUT_INTERSECTS);
            throw new ValidatorException(GEOMETRY_WHITHOUT_INTERSECTS, HttpStatus.NOT_ACCEPTABLE);
        }
    }
}

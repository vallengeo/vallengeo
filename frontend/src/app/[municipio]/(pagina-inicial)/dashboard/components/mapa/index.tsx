"use client";

import { useReactToPrint } from "react-to-print";
import { useEffect, useMemo, useRef, useState } from "react";
import L, { FeatureGroup } from "leaflet";
import "leaflet/dist/leaflet.css";
import "@/lib/mapa/leaflet-zoominfo/Control.Zoominfo.scss";
import "@/lib/mapa/Control.FullScreen.css";
import "@/lib/mapa/measure-tools/measure-tools.css";
import "@/lib/mapa/mapa.scss";

import "leaflet.fullscreen";
import "leaflet-easybutton";

import {
  DEFAULT_CONFIG,
  BASE_LAYERS_CONFIG,
  GEOSERVER_URL,
} from "@/lib/mapa/mapa.config";
import { CoordinatesControl } from "@/lib/mapa/leaflet-zoominfo/Control.Zoominfo";
import { MeasureTools } from "@/lib/mapa/measure-tools/measure-tools";
import CamadasToggleCard from "./camadas";
import ZoomControl from "@/lib/mapa/leaflet-zoominfo/ZoomControl";
import Pesquisar from "./pesquisar";
import Imoveis from "./imoveis";
import Camada from "@/interfaces/ICamada";
import { buscarCamadasPeloGrupoId } from "@/service/camadaService";
import { capitalizeString, normalizeString } from "@/lib/utils";

interface Sugestao {
  id: number;
  valor: string;
}

export function Mapa() {
  const [defaultBaseLayerName, setDefaultBaseLayerName] =
    useState<string>("Terreno");

  const mapRef = useRef<L.Map | null>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const [isCamadasCardOpen, setIsCamadasCardOpen] = useState(false);
  const [camadasGeo, setCamadasGeo] = useState<FeatureGroup | null>(null);
  const defaultBaseLayer = BASE_LAYERS_CONFIG[defaultBaseLayerName];
  const [tileLayer, setTileLayer] = useState<L.TileLayer>(defaultBaseLayer);

  const [selectedLayer, setSelectedLayer] = useState<Camada[]>([]);
  const [camadas, setCamadas] = useState<Camada[]>([]);
  const camadasPesquisar = useRef<FeatureGroup>(new FeatureGroup());

  const camadaLayersRef = useRef<{ [key: number]: L.Layer }>({});
  const layers = useRef<FeatureGroup>(new FeatureGroup());

  const [imoveisLayers] = useState<FeatureGroup>(new L.FeatureGroup());

  const [opcoes, setOpcoes] = useState<Sugestao[]>([]);
  const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const buscarCamadas = async () => {
    try {
      const response = await buscarCamadasPeloGrupoId();
      setCamadas(response);
    } catch (error) {
      console.error("Erro ao buscar as camadas do grupo:", error);
    }
  };
  const onChange = async (searchValue: string) => {
    if (map && searchValue === "") {
      camadasPesquisar.current.removeFrom(map);
      camadasPesquisar.current.clearLayers();
    } else {
      const results: Sugestao[] = [];
      try {
        const features = await fetchOnGeoserver(searchValue);
        features.forEach(
          (feature: { properties: { pesquisa: any; fid: any } }) => {
            if (feature?.properties?.pesquisa) {
              results.push({
                id: feature.properties.fid,
                valor: capitalizeString(feature.properties.pesquisa),
              });
            }
          }
        );
      } catch (error) {
        console.error("Erro ao buscar dados do GeoServer:", error);
      } finally {
        setOpcoes(results);
      }
    }
  };

  const fetchOnGeoserver = async (searchValue: string) => {
    const layers = camadas.filter(
      (camada) =>
        camada.categoria.codigo === "TRECHO_LOGRADOURO" ||
        camada.categoria.codigo === "LOTE"
    );

    const results = await Promise.all(
      layers.map((layer) => fetchGeoServerData(layer, searchValue))
    );

    return results
      .filter((result) => result) // Remove respostas nulas
      .flatMap((result) => result.features); // Combina os "features" de ambas as camadas
  };

  const handleSearch = async (searchValue: string) => {
    if (map && searchValue !== "") {
      camadasPesquisar.current.removeFrom(map);
      camadasPesquisar.current.clearLayers();
      try {
        const features: any = await fetchOnGeoserver(searchValue);

        camadasPesquisar.current.addLayer(
          new L.GeoJSON(features, {
            style: {},
            onEachFeature: (feature) => {
              feature.type = feature.type || "Feature";
              feature.properties = {};
              feature.properties.editable = false;
            },
          })
        );

        camadasPesquisar.current.addTo(map!);
        if (camadasPesquisar.current.getBounds().isValid()) {
          map.fitBounds(camadasPesquisar.current.getBounds());
        }
      } catch (error) {
        console.error("Erro ao buscar dados do GeoServer:", error);
      }
    } else {
      camadasPesquisar.current.removeFrom(map!);
      camadasPesquisar.current.clearLayers();
    }
  };

  const fetchGeoServerData = async (camada: Camada, searchValue: string) => {
    searchValue = normalizeString(searchValue);

    const params = new URLSearchParams({
      version: "1.1.1",
      service: "WFS",
      request: "GetFeature",
      typeName: `${camada.codigo}`,
      srs: "EPSG:4674",
      outputFormat: "application/json",
      CQL_FILTER: `pesquisa ILIKE '%${searchValue}%'`, // Filtro por valor
    });

    try {
      const response = await fetch(`${GEOSERVER_URL}?${params.toString()}`);
      if (!response.ok) {
        throw new Error(
          `Erro ao consultar camada ${camada.codigo}: ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return null; // Retorna nulo se a consulta falhar
    }
  };

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        zoom: DEFAULT_CONFIG.zoom,
        maxZoom: DEFAULT_CONFIG.maxZoom,
        doubleClickZoom: true,
        dragging: true,
        attributionControl: false,
        scrollWheelZoom: true,
        zoomControl: false,
        fullscreenControl: false,
      });
    }
    const map = mapRef.current;

    map.setView(DEFAULT_CONFIG.center, DEFAULT_CONFIG.zoom);

    //CAMADAS
    L.easyButton(
      "</>",
      function () {
        setIsCamadasCardOpen((prev) => !prev);
      },
      "Camadas",
      "camadas-button"
    )
      .setPosition("topright")
      .addTo(map);

    // ZOOM
    ZoomControl(map);

    // FULLSCREEN
    L.control
      .fullscreen({
        position: "topright",
      })
      .addTo(map);

    // CENTRALIZAR
    L.easyButton(
      "</>",
      function (btn, map) {
        if (imoveisLayers.getBounds().isValid()) {
          map.fitBounds(imoveisLayers.getBounds(), {
            maxZoom: DEFAULT_CONFIG.maxZoom,
          });
        } else {
          map.setView(DEFAULT_CONFIG.center, DEFAULT_CONFIG.zoom);
        }
      },
      "Centralizar",
      "zoom-center"
    )
      .setPosition("topright")
      .addTo(map);

    // Adicione o controle de escala ao mapa usando as configurações do DEFAULT_CONFIG
    if (DEFAULT_CONFIG.controles.escala.enabled) {
      new CoordinatesControl().addTo(map);
    }

    // Chama a função para adicionar as ferramentas de medição
    if (DEFAULT_CONFIG.controles.medicao.enabled) {
      MeasureTools(map);
    }

    //IMPRIMIR
    L.easyButton(
      "</>",
      function () {
        reactToPrintFn();
      },
      "Imprimir",
      "imprimir-button"
    )
      .setPosition("topright")
      .addTo(map);

    setMap(map);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCamadasGeo(layers.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layers]);

  useEffect(() => {
    if (camadasGeo && map) {
      camadasGeo.addTo(map);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camadasGeo]);

  useEffect(() => {
    if (tileLayer && map) {
      if (tileLayer.options.id) {
        setDefaultBaseLayerName(tileLayer.options.id);
      }
      tileLayer.addTo(map);
      tileLayer.bringToBack();
    }
  }, [tileLayer, map]);

  useEffect(() => {
    // Atualiza o mapa com base nas camadas selecionadas
    selectedLayer.forEach((camada) => {
      // Verifica se a camada já existe, senão cria uma nova L.tileLayer.wms
      if (!camadaLayersRef.current[camada.id]) {
        camadaLayersRef.current[camada.id] = L.tileLayer.wms(GEOSERVER_URL, {
          layers: camada.codigo,
          format: "image/png",
          transparent: true,
          attribution: camada.nome,
        });
      }
      // Adiciona a camada ao mapa
      layers.current.addLayer(camadaLayersRef.current[camada.id]);
    });

    // Remove as camadas que não estão mais em selectedLayer
    Object.keys(camadaLayersRef.current).forEach((id) => {
      const camadaId = Number(id);
      if (!selectedLayer.find((layer) => layer.id === camadaId)) {
        layers.current.removeLayer(camadaLayersRef.current[camadaId]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayer]);

  useEffect(() => {
    buscarCamadas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSugestoes(
      Array.from(
        new Map(
          opcoes.map((sugestao) => [sugestao.valor.toLowerCase(), sugestao])
        ).values()
      )
        .sort((a, b) => a.valor.localeCompare(b.valor))
        .slice(0, 5)
    );
    setLoading(false);
  }, [opcoes]);

  return (
    <div id="mapa-content" ref={contentRef}>
      <div className="cursor-pointer map" id="map">
        <Pesquisar
          onSearch={handleSearch}
          onChange={onChange}
          sugestoes={sugestoes}
          loading={loading}
        />
        <CamadasToggleCard
          isOpen={isCamadasCardOpen}
          tileLayerSelected={defaultBaseLayerName}
          setTileLayer={setTileLayer}
          selectedLayer={selectedLayer}
          setSelectedLayer={setSelectedLayer}
          camadas={camadas}
        />
        <Imoveis map={map} imoveisLayers={imoveisLayers} />
      </div>
    </div>
  );
}

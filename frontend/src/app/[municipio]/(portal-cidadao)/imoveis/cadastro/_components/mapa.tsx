import { useEffect, useRef, useState } from "react";
import L, { FeatureGroup, Map } from "leaflet";
import { GeoJsonObject } from "geojson";
import "leaflet/dist/leaflet.css";
import "@/lib/mapa/leaflet-zoominfo/Control.Zoominfo.scss";
import UploadBox from "./uploadBox";
import IIntersectGeo from "@/interfaces/IIntersectGeo";
import IErrorUpload from "@/interfaces/IErrorUpload";
import Geometria from "@/interfaces/IGeometry";
import { v4 as uuidv4 } from "uuid";

import {
  DEFAULT_CONFIG,
  BASE_LAYERS_CONFIG,
  TILE_LAYER_CONFIG,
} from "@/lib/mapa/mapa.config";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";

type Props = IProps;

type IProps = {
  geometryUpload: IIntersectGeo | undefined;
  setGeometryUpload: (value: GeoJsonObject[] | undefined) => void;
  errorUpload: IErrorUpload;
  setErrorUpload: (value: IErrorUpload) => void;
  georreferenciamento: Geometria;
  setGeorreferenciamento: (value: Geometria) => void;
  setLoading: (value: boolean) => void;
};

const Mapa: React.FC<any> = ({
  errorUpload,
  setErrorUpload,
  setLoading,
}: Props) => {
  const form = useFormContext();
  const { setValue } = form;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [geometryUpload, setGeometryUpload] = useState<IIntersectGeo>();
  const mapRef = useRef<Map | null>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const [geometria] = useState<FeatureGroup>(new L.FeatureGroup());

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        zoom: DEFAULT_CONFIG.zoom,
        minZoom: DEFAULT_CONFIG.minZoom,
        maxZoom: DEFAULT_CONFIG.maxZoom,
        doubleClickZoom: false,
        dragging: false,
        zoomControl: false,
        attributionControl: DEFAULT_CONFIG.attributionControl,
        scrollWheelZoom: false,
      });
    }
    const map = mapRef.current;

    map.setView(DEFAULT_CONFIG.center, DEFAULT_CONFIG.zoom);

    L.control.layers(BASE_LAYERS_CONFIG, {}).addTo(map);

    // // Adicione o controle de escala ao mapa usando as configurações do DEFAULT_CONFIG
    // if (DEFAULT_CONFIG.controles.escala.enabled) {
    //     // Adicione o controle de escala ao mapa
    //     L.control.scale().addTo(map);

    //     // Instancie o controle de coordenadas e adicione-o ao mapa
    //     new CoordinatesControl().addTo(map);
    // }

    setMap(map);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (map) {
      L.tileLayer(TILE_LAYER_CONFIG.url, TILE_LAYER_CONFIG.options).addTo(map);
      map.addLayer(geometria);
    }
  }, [map, geometria]);

  //Upload de camada
  useEffect(() => {
    if (map !== null) {
      if (geometryUpload) {
        const geometry = geometryUpload.geometria;

        const geojson = new L.GeoJSON(geometry, {
          style: {
            color: "#6A68F0",
            opacity: 0.8,
            fillColor: "#6A68F0",
            fillOpacity: 0.8,
          },
          onEachFeature: (feature) => {
            feature.type = feature.type || "Feature";
            feature.properties = {};
            feature.properties.id = uuidv4();
            feature.properties.editable = false;
          },
        });

        removeGroupLayers(geometria);
        addNonGroupLayers(geojson, geometria);
        map.fitBounds(geojson.getBounds());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, geometryUpload]);

  //Função para adicionar a Layer ao FeatureGroup
  const addNonGroupLayers = (sourceLayer: any, featureGroup: FeatureGroup) => {
    if (sourceLayer instanceof L.LayerGroup) {
      sourceLayer.eachLayer(function (layer: any) {
        addNonGroupLayers(layer, featureGroup);
      });
    } else {
      featureGroup.addLayer(sourceLayer);
    }
  };

  const removeGroupLayers = async (featureGroup: FeatureGroup) => {
    if (featureGroup instanceof L.LayerGroup) {
      featureGroup.eachLayer(function (layer: any) {
        removeGroupLayers(layer);
      });
      featureGroup.clearLayers();
    }
  };

  function handleSetInformacoesImovel() {
    if (!geometryUpload) {
      return;
    }

    const { informacoesImovel } = geometryUpload;
    const {
      cep,
      logradouro,
      bairro,
      idMunicipio,
      nomeMunicipio,
      numero,
      siglaUf,
    } = informacoesImovel.informacaoImovel.endereco;

    setValue("informacaoImovel.endereco.cep", cep);
    setValue("informacaoImovel.endereco.logradouro", logradouro);
    setValue("informacaoImovel.endereco.bairro", bairro);
    setValue("informacaoImovel.endereco.idMunicipio", idMunicipio);
    setValue("informacaoImovel.endereco.nomeMunicipio", nomeMunicipio);
    setValue("informacaoImovel.endereco.numero", numero);
    setValue("informacaoImovel.endereco.siglaUf", siglaUf);
    setValue("caracterizacaoImovel", informacoesImovel.caracterizacaoImovel);

    closeDialog();
  }

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div
        className="rounded-2xl cursor-pointer"
        id="map"
        style={{
          width: "auto",
          height: "80vh",
          cursor: "default",
        }}
      />
      <UploadBox
        setGeometryUpload={setGeometryUpload}
        errorUpload={errorUpload}
        setErrorUpload={setErrorUpload}
        setLoading={setLoading}
        setIsDialogOpen={setIsDialogOpen}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[380px] max-md:h-auto rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Identificação</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 px-6 pb-6">
            <p className="text-sm">
              Detectamos uma localidade georreferenciada; podemos preenchê-la
              com as informações identificadas? Lembre-se de que a qualquer
              momento você pode editar os dados.
            </p>

            <div className="flex items-center justify-end gap-6">
              <Button variant={`secondary`} onClick={closeDialog}>
                Não
              </Button>
              <Button variant={`default`} onClick={handleSetInformacoesImovel}>
                Sim
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Mapa;

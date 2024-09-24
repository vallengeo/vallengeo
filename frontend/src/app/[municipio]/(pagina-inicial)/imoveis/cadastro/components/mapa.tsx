import { useEffect, useRef, useState } from 'react';
import L, { FeatureGroup, Map } from 'leaflet';
import { GeoJsonObject } from 'geojson';
import 'leaflet/dist/leaflet.css';
import '@/lib/mapa/L.Control.Zoominfo.css'
import UploadBox from './uploadBox';
import IIntersectGeo from '@/interfaces/IIntersectGeo';
import IErrorUpload from '@/interfaces/IErrorUpload';
import IGeometry from '@/interfaces/IGeometry';
import { v4 as uuidv4 } from 'uuid'

import {
    DEFAULT_CONFIG,
    BASE_LAYERS_CONFIG,
    TILE_LAYER_CONFIG
} from '@/lib/mapa/mapa.config'

// Importe o controle de coordenadas
import { CoordinatesControl } from '@/lib/mapa/L.Control.Zoominfo'

type Props = IProps

type IProps = {
    geometryUpload: IIntersectGeo | undefined
    setGeometryUpload: (value: GeoJsonObject[] | undefined) => void
    errorUpload: IErrorUpload
    setErrorUpload: (value: IErrorUpload) => void
    georreferenciamento: IGeometry
    setGeorreferenciamento: (value: IGeometry) => void
    setLoading: (value: boolean) => void
}


const Mapa: React.FC<any> = ({
    errorUpload,
    setErrorUpload,
    setLoading
}: Props) => {
    const [geometryUpload, setGeometryUpload] = useState<IIntersectGeo>()
    const mapRef = useRef<Map | null>(null);
    const [map, setMap] = useState<L.Map | null>(null);
    const [geometria] = useState<FeatureGroup>(new L.FeatureGroup())

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map('map', {
                zoom: DEFAULT_CONFIG.zoom,
                minZoom: DEFAULT_CONFIG.minZoom,
                maxZoom: DEFAULT_CONFIG.maxZoom,
                doubleClickZoom: false,
                dragging: false,
                zoomControl: false,
                attributionControl: DEFAULT_CONFIG.attributionControl,
                scrollWheelZoom: false
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
                        color: '#6A68F0',
                        opacity: 0.8,
                        fillColor: '#6A68F0',
                        fillOpacity: 0.8
                    },
                    onEachFeature: feature => {
                        feature.type = feature.type || 'Feature';
                        feature.properties = {};
                        feature.properties.id = uuidv4();
                        feature.properties.editable = false;
                    }
                });

                removeGroupLayers(geometria);
                addNonGroupLayers(geojson, geometria);
                map.fitBounds(geojson.getBounds())
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, geometryUpload]);

    //Função para adicionar a Layer ao FeatureGroup
    const addNonGroupLayers = (sourceLayer: any, featureGroup: FeatureGroup) => {
        if (sourceLayer instanceof L.LayerGroup) {
            sourceLayer.eachLayer(function (layer: any) {
                addNonGroupLayers(layer, featureGroup)
            })
        } else {
            featureGroup.addLayer(sourceLayer)
        }
    }

    const removeGroupLayers = async (featureGroup: FeatureGroup) => {
        if (featureGroup instanceof L.LayerGroup) {
            featureGroup.eachLayer(function (layer: any) {
                removeGroupLayers(layer)
            })
            featureGroup.clearLayers();
        }
    }


    return (
        <>
            <div className="rounded-2xl cursor-pointer"
                id='map'
                style={{
                    width: 'auto',
                    height: '80vh',
                    cursor: 'default'
                }}
            />
            <UploadBox
                setGeometryUpload={setGeometryUpload}
                errorUpload={errorUpload}
                setErrorUpload={setErrorUpload}
                setLoading={setLoading}
            />
        </>
    );
};

export default Mapa;
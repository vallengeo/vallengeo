"use client"
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from 'react';
import L, { FeatureGroup, Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@/lib/mapa/leaflet-zoominfo/Control.Zoominfo.scss'
import '@/lib/mapa/Control.FullScreen.css'
import '@/lib/mapa/measure-tools/measure-tools.css'
import '@/lib/mapa/mapa.scss'

import 'leaflet.fullscreen';
import 'leaflet-easybutton'

import {
    DEFAULT_CONFIG,
    BASE_LAYERS_CONFIG
} from '@/lib/mapa/mapa.config'
import { CoordinatesControl } from '@/lib/mapa/leaflet-zoominfo/Control.Zoominfo';
import { MeasureTools } from '@/lib/mapa/measure-tools/measure-tools';
import CamadasToggleCard from './camadas';
import ZoomControl from '@/lib/mapa/leaflet-zoominfo/ZoomControl';
import { Legenda } from './legenda';
import Pesquisar from './pesquisar';
import Imoveis from "./imoveis";

const handleSearch = (searchValue: string) => {
    console.log('Valor de pesquisa:', searchValue);
    // Aqui você pode adicionar a lógica para lidar com a pesquisa
};

export function Mapa() {
    const [defaultBaseLayerName, setDefaultBaseLayerName] = useState<string>('Terreno');

    const mapRef = useRef<Map | null>(null);
    const [map, setMap] = useState<L.Map | null>(null);
    const [isCamadasCardOpen, setIsCamadasCardOpen] = useState(false);
    const [camadasGeo, setCamadasGeo] = useState<FeatureGroup | null>(null)
    const defaultBaseLayer = BASE_LAYERS_CONFIG[defaultBaseLayerName];
    const [tileLayer, setTileLayer] = useState<L.TileLayer>(defaultBaseLayer);
    

    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map('map', {
                zoom: DEFAULT_CONFIG.zoom,
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
            '</>',
            function () {
                setIsCamadasCardOpen((prev) => !prev);
            },
            'Camadas',
            'camadas-button'
        )
            .setPosition('topright')
            .addTo(map);

        // ZOOM
        ZoomControl(map);

        // FULLSCREEN
        L.control.fullscreen({
            position: 'topright'
        }).addTo(map);

        // CENTRALIZAR
        L.easyButton(
            '</>',
            function (btn, map) {
                map.setView(DEFAULT_CONFIG.center, DEFAULT_CONFIG.zoom);
            },
            'Centralizar',
            'zoom-center'
        )
            .setPosition('topright')
            .addTo(map)


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
            '</>',
            function () {
                reactToPrintFn();
            },
            'Imprimir',
            'imprimir-button'
        )
            .setPosition('topright')
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
        if (camadasGeo && map) {
            console.log('mapa-cidade camadasGeo ', camadasGeo);
            camadasGeo.addTo(map);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [camadasGeo])

    useEffect(() => {
        if (tileLayer && map) {
            if (tileLayer.options.id) {
                setDefaultBaseLayerName(tileLayer.options.id);
            }
            tileLayer.addTo(map);
            tileLayer.bringToBack();
        }
    }, [tileLayer, map])

    return (
        <div id="mapa-content" ref={contentRef}>
            <div className="rounded-2xl cursor-pointer map"
                id='map'
            >
                <Pesquisar onSearch={handleSearch} />
                <CamadasToggleCard
                    isOpen={isCamadasCardOpen}
                    tileLayerSelected={defaultBaseLayerName}
                    setTileLayer={setTileLayer}
                    setCamadasGeo={setCamadasGeo}
                />
                <Legenda />
                <Imoveis map={map} />
            </div>
        </div>
    )
}
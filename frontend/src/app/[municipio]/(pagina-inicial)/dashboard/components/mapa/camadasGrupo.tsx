import { BASE_LAYERS_CONFIG, GEOSERVER_URL } from "@/lib/mapa/mapa.config";
import React, { useEffect, useRef, useState } from 'react';
import L, { FeatureGroup } from 'leaflet';

import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'

import { buscarCamadasPeloGrupoId } from '@/service/camadaService'
import Camada from "@/interfaces/ICamada";


interface CamadaGrupoProps {
    setCamadasGeo: (value: FeatureGroup) => void
}

export const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
})

const CamadasGrupo: React.FC<CamadaGrupoProps> = ({setCamadasGeo }) => {
    // Referência para os WMS layers criados
    const camadaLayersRef = useRef<{ [key: number]: L.Layer }>({});

    const [selectedLayer, setSelectedLayer] = useState<Camada[]>([]);
    const [camadas, setCamadas] = useState<Camada[]>([]);

    const layers = useRef<FeatureGroup>(new FeatureGroup());

    const buscarCamadas = async () => {
        try {
            const response = await buscarCamadasPeloGrupoId();
            setCamadas(response);

        } catch (error) {
            console.error('Erro ao buscar as camadas do grupo:', error)
        }
    }

    const habilitarDesabilitarCamada = (camada: Camada) => {
        if (selectedLayer.find(layer => layer.id === camada.id)) {
            // Remove se existir
            setSelectedLayer(selectedLayer.filter(layer => layer.id !== camada.id));
        }
        else {
            // adicionar
            setSelectedLayer([...selectedLayer, camada]);
        }
    };

    useEffect(() => {
        buscarCamadas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log('setCamadaGeo');
        setCamadasGeo(layers.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layers])

    useEffect(() => {
        // Atualiza o mapa com base nas camadas selecionadas
        selectedLayer.forEach(camada => {
            // Verifica se a camada já existe, senão cria uma nova L.tileLayer.wms
            if (!camadaLayersRef.current[camada.id]) {
                camadaLayersRef.current[camada.id] = L.tileLayer.wms(GEOSERVER_URL, {
                    layers: camada.codigo,
                    format: 'image/png',
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
            if (!selectedLayer.find(layer => layer.id === camadaId)) {
                layers.current.removeLayer(camadaLayersRef.current[camadaId]);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedLayer]);

    return (
        <div className="pr-3">

            {camadas.map((camada) => (
                <label className="flex cursor-pointer select-none items-center" key={camada.codigo}>
                    <div className='relative flex justify-between pb-3 w-full'>
                        <input type="checkbox" className="sr-only peer mr-2"
                            checked={!!selectedLayer.find(layer => layer.id === camada.id)}
                            onChange={() => habilitarDesabilitarCamada(camada)} />
                        <span className={cn("text-xs text-gray-900 dark:text-gray-300 text-title", inter.className)}>{camada.nome}</span>
                        <div className="ms-3 relative w-7 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                    </div>
                </label>
            ))}
        </div>
    );
};

export default CamadasGrupo;
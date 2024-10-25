import { BASE_LAYERS_CONFIG } from "@/lib/mapa/mapa.config";
import React, { useEffect, useState } from 'react';
import L from 'leaflet';

import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'

interface CamadasBaseProps {
    map: L.Map | null;
}

export const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
})

const listCamadasGeoServer: { [key: string]: L.TileLayer } = BASE_LAYERS_CONFIG;

const CamadasBase: React.FC<CamadasBaseProps> = ({ map }) => {
    const [selectedLayer, setSelectedLayer] = useState<string>("Google Satélite");


    const habilitarDesabilitarCamada = (camadaName: string) => {
        if (map && (selectedLayer !== camadaName)) {
            // Remove a camada atual do mapa, se existir
            Object.values(listCamadasGeoServer).forEach((layer) => {
                map.removeLayer(layer);
            });

            // Aplica a nova camada selecionada
            const newLayer = listCamadasGeoServer[camadaName];
            if (newLayer) {
                newLayer.addTo(map);
            }

            setSelectedLayer(camadaName);
        }
    };

    useEffect(() => {
        if (map) {
            if (selectedLayer) {
                const initialLayer = listCamadasGeoServer[selectedLayer];
                if (initialLayer) {
                    initialLayer.addTo(map);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, selectedLayer]);

    return (
        <div className="pr-3">

            {Object.keys(listCamadasGeoServer).sort().map((camadaName) => (

                <label className="flex cursor-pointer select-none items-center" key={camadaName}>
                    <div className='relative flex justify-between pb-3 w-full'>
                        <input type="checkbox" className="sr-only peer mr-2" name="camadas"
                            checked={selectedLayer === camadaName}
                            onChange={() => habilitarDesabilitarCamada(camadaName)} />

                        <span className={cn("text-xs text-gray-900 dark:text-gray-300 text-title", inter.className)}>{camadaName}</span>
                        
                        <div className="ms-3 relative w-7 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                    </div>
                </label>

            ))}
        </div>
    );
};

export default CamadasBase;
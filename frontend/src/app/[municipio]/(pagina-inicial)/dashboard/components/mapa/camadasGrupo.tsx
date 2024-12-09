import React from 'react';

import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'

import Camada from "@/interfaces/ICamada";

interface CamadaGrupoProps {
    selectedLayer: Camada[]
    setSelectedLayer: (value: Camada[]) => void
    camadas: Camada[]
}

export const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
})

const CamadasGrupo: React.FC<CamadaGrupoProps> = ({selectedLayer, setSelectedLayer, camadas }) => {
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
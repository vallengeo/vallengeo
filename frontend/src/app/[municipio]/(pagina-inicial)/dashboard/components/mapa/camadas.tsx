import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import CamadasBase from "./camadasBase";
import CamadasGrupo from "./camadasGrupo";
import Camada from "@/interfaces/ICamada";

interface CamadasToggleCardProps {
    isOpen: boolean;
    tileLayerSelected: string
    setTileLayer: (value: L.TileLayer) => void
    selectedLayer: Camada[]
    setSelectedLayer: (value: Camada[]) => void
    camadas: Camada[]
}

export const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
})

const CamadasToggleCard: React.FC<CamadasToggleCardProps> = ({ isOpen, setTileLayer, tileLayerSelected, selectedLayer, setSelectedLayer, camadas }) => {
    const [toggleIsOpen, setToggleIsOpen] = useState(false);

    const toggleDiv = () => {
        setToggleIsOpen(!toggleIsOpen); // Alterna a visibilidade
    };

    useEffect(() => {
        const leafletRightDiv = document.querySelector('.leaflet-right') as HTMLElement;
        const camadasButtonDiv = document.querySelector('#camadas-button') as HTMLElement;

        if (isOpen && leafletRightDiv) {
            leafletRightDiv.style.right = "305px";
        } else if (leafletRightDiv) {
            leafletRightDiv.style.right = "0px";
        }

        if (isOpen && camadasButtonDiv) {
            camadasButtonDiv.classList.add('actived');
        } else if (camadasButtonDiv) {
            camadasButtonDiv.classList.remove('actived');
        }

    }, [isOpen]); // Executa o efeito quando `isOpen` muda

    return (
        <>
            {isOpen && (
                <div className="card-tools open"
                >
                    <div className="titulo">
                        <h2 className={cn("text-xl font-medium text-title", inter.className)}>Camadas</h2>
                    </div>
                    <div className="camada-content bg-gray max-w-full mx-auto overflow-x-auto">
                        <div className="">

                            <div className="relative transition-all duration-700 pt-6">
                                <div className="pb-6">
                                    <CamadasBase tileLayerSelected={tileLayerSelected} setTileLayer={setTileLayer} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray max-w-full mx-auto divide-y divide-slate-200">
                            <button onClick={toggleDiv} className="w-full px-6 pt-6 pb-3 text-left">
                                <div className="flex items-center justify-between">
                                    <h4 className={cn("text-base font-medium text-title", inter.className)}>Cadastro imobiliário</h4>
                                    {toggleIsOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                                </div>
                            </button>
                            {toggleIsOpen && (
                                <div className="relative transition-all duration-700 pt-6">
                                    <div className="pb-6">
                                        <CamadasGrupo
                                            selectedLayer={selectedLayer}
                                            setSelectedLayer={setSelectedLayer}
                                            camadas={camadas} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            )}
        </>
    );
};

export default CamadasToggleCard;
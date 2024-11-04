import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'

interface FerramentasToggleCardProps {
    isOpen: boolean;
}

export const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
})

const FerramentasToggleCard: React.FC<FerramentasToggleCardProps> = ({ isOpen }) => {
    const [toggleIsOpen, setToggleIsOpen] = useState(false);

    const toggleDiv = () => {
        setToggleIsOpen(!toggleIsOpen); // Alterna a visibilidade
    };

    useEffect(() => {
        const leafletRightDiv = document.querySelector('.leaflet-right') as HTMLElement;
        const ferramentasButtonDiv = document.querySelector('#ferramentas-button') as HTMLElement;

        if (isOpen && leafletRightDiv) {
            leafletRightDiv.style.right = "265px";
        } else if (leafletRightDiv) {
            leafletRightDiv.style.right = "0px";
        }

        if (isOpen && ferramentasButtonDiv) {
            ferramentasButtonDiv.classList.add('actived');
        } else if (ferramentasButtonDiv) {
            ferramentasButtonDiv.classList.remove('actived');
        }

    }, [isOpen]); // Executa o efeito quando `isOpen` muda

    return (
        <>
            {isOpen && (
                <div className="card-tools open"
                >
                    <div className="titulo">
                        <h2 className={cn("text-xl font-medium text-title", inter.className)}>Ferramentas</h2>
                    </div>

                    <div className="bg-gray max-w-full mx-auto divide-y divide-slate-200">
                            <button onClick={toggleDiv} className="w-full px-6 pt-6 pb-3 text-left">
                                <div className="flex items-center justify-between">
                                <h4 className={cn("text-base font-medium text-title", inter.className)}>Medidas no mapa</h4>
                                    {toggleIsOpen ? <ChevronUp size={15}  /> : <ChevronDown size={15} />}
                                </div>
                            </button>
                            {toggleIsOpen && (
                                <div className="relative transition-all duration-700 pt-6">
                                    <div className="pb-6">
                                       {/* <MeasureTools map={map} /> */}
                                    </div>
                                </div>
                            )}
                        </div>

                    
                </div>
            )}
        </>
    );
};

export default FerramentasToggleCard;
import { MapaImovel } from '@/interfaces/IMapaImovel';
import { imoveisCadastradosMapa } from '@/service/analista/analistaService';
import { useEffect, useState } from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { Home } from 'lucide-react';

import L, { FeatureGroup } from 'leaflet';
import { v4 as uuidv4 } from 'uuid'
import { Endereco } from '@/interfaces/IEndereco';
import { TipoUso } from '@/interfaces/ITipoUso';

interface MapaImoveisProps {
    map: L.Map | null;
}

const MapaImoveis: React.FC<MapaImoveisProps> = ({ map }) => {
    const [imoveisLayers] = useState<FeatureGroup>(new L.FeatureGroup())

    const addNonGroupLayers = (sourceLayer: any, featureGroup: FeatureGroup) => {
        if (sourceLayer instanceof L.LayerGroup) {
            sourceLayer.eachLayer(function (layer: any) {
                addNonGroupLayers(layer, featureGroup)
            })
        } else {
            featureGroup.addLayer(sourceLayer)
        }
    }

    const fetchImoveis = () => {
        imoveisCadastradosMapa()
            .then(response => {
                const imoveis: MapaImovel[] = response.data;

                imoveis.forEach((imovel: MapaImovel) => {
                    const cor = corCamada(imovel.informacaoImovel.tipoUso);
                    const mapaGeo = new L.GeoJSON(imovel.geometria, {
                        style: {
                            color: cor,
                            opacity: 0,
                            fillColor: cor,
                            fillOpacity: 0.8,
                        },
                        onEachFeature: feature => {
                            feature.type = feature.type || 'Feature';
                            feature.properties = {};
                            feature.properties.id = uuidv4();
                            feature.properties.editable = false;
                        }
                    });

                    mapaGeo.addTo(map!);
                    // popup
                    const popup = L.popup().setContent(
                        `<div class="flex items-center gap-3 w-auto pr-5">
                            <div>
                                ${ReactDOMServer.renderToString(<Home size={60} color="black" />)}
                                </div>
                                    <div>
                                        <div class="text-base font-semibold" style="color:#6A68F0; text-wrap-mode: nowrap;">
                                            ${imovel.inscricaoImobiliaria}</div>
                                        <div class="text-xs text-nowrap">${montarEndereco(imovel.informacaoImovel.endereco)}</div>
                                        <div class="text-sm text-end pt-3 no-underline hover:underline" style="color:#6A68F0;">
                                            <a href='/imoveis/ficha/${imovel.id}'>Mais informações</a>
                                        </div>
                                    </div>
                        </div>`
                    )

                    mapaGeo.bindPopup(popup);

                    addNonGroupLayers(mapaGeo, imoveisLayers);
                    map?.fitBounds(mapaGeo.getBounds())
                })


            });
    }

    const montarEndereco = (endereco: Endereco): string => {
        return `${endereco.logradouro}, ${endereco.numero}, <br> ${endereco.municipio.nome}/${endereco.municipio.estado.uf}`
    }

    const corCamada = (tipoImovel: TipoUso): string => {
        if (tipoImovel.id === 1) { // residencial
            return '#0EA061';
        }
        else if (tipoImovel.id === 2) { // comercial
            return '#005074';
        }
        else if (tipoImovel.id === 3) { // misto
            return '#729397';
        }
        return '';
    }

    useEffect(() => {
        if (map) {
            fetchImoveis();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map]);

    return null;
};

export default MapaImoveis;
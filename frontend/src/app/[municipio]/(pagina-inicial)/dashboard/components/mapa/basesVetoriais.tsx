import React, { useState } from "react";

interface CamadaGeoServer {
  id: number;
  nome: string;
  active: boolean;
}

interface BasesVetoriaisProps {
  listCamadasGeoServer: CamadaGeoServer[];
}

const BasesVetoriais: React.FC<BasesVetoriaisProps> = ({ listCamadasGeoServer }) => {
  const [camadas, setCamadas] = useState(listCamadasGeoServer);

  const habilitarDesabilitarCamada = (camada: CamadaGeoServer) => {
    setCamadas(prevCamadas =>
      prevCamadas.map(c =>
        c.id === camada.id ? { ...c, active: !c.active } : c
      )
    );
  };

  return (
    <div id="bases-vetoriais">
      {camadas.length > 0 && (
        camadas.map(camada => (
          <div key={camada.id} className="mb-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={camada.active}
                onChange={() => habilitarDesabilitarCamada(camada)}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="text-gray-800">{camada.nome}</span>
            </label>
          </div>
        ))
      )}
    </div>
  );
};

export default BasesVetoriais;
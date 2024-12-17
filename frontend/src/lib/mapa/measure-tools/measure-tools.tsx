import L from "leaflet";
import "leaflet-draw";
import { DrawLocal } from "@/lib/mapa/DrawLocal";

export function MeasureTools(map: L.Map) {

  DrawLocal();

  // Initialise the draw control and pass it the FeatureGroup of editable layers
  const drawControl = new L.Control.Draw({
    position: "topright",
    draw: {
      polygon: {
        shapeOptions: {
          color: "#ffcc00",
          opacity: 1,
          dashArray: "10, 10",
          fillColor: "#8DFA61",
          fillOpacity: 0.3,
        },
      },
      circle: {
        shapeOptions: {
          color: "#ffcc00",
          opacity: 1,
          weight: 2,
          dashArray: "10, 10",
          fillColor: "#8DFA61",
          fillOpacity: 0.3,
        },
      },
      polyline: {
        shapeOptions: {
          color: "#ffcc00",
          opacity: 1,
          weight: 3,
          fillColor: "#8DFA61",
          fillOpacity: 0.3,
        },
      },
      rectangle: false,
      marker: false,
      circlemarker: false,
    },
  });
  map.addControl(drawControl);

  var editableLayers = new L.FeatureGroup();
  map.addLayer(editableLayers);

  let latlngs: L.LatLng[] = [];
  let isPolyline: boolean = false;
  const layerMarkersMap = new Map<L.Layer, L.Marker[]>(); // Map para associar camadas e seus marcadores
  let currentMarkers: L.Marker[] = []; // Array temporário para armazenar marcadores durante o desenho

  map.on(L.Draw.Event.DRAWSTART, (event: any) => {
    isPolyline = event.layerType === "polyline";
    if (isPolyline) {
      latlngs = [];
      currentMarkers = []; // Reinicia os marcadores temporários ao iniciar um novo desenho
    }
  });

  map.on(L.Draw.Event.DRAWVERTEX, (event: any) => {
    const layers = event.layers.getLayers();

    if (isPolyline && layers.length > 0) {
      const layer = layers[layers.length - 1];

      if (layer instanceof L.Marker) {
        latlngs.push(layer.getLatLng());

        if (latlngs.length > 1) {
          const lastPoint = latlngs[latlngs.length - 1];
          const secondLastPoint = latlngs[latlngs.length - 2];
          const segmentDistance = secondLastPoint.distanceTo(lastPoint);

          const label = L.marker(lastPoint, {
            icon: L.divIcon({
              className: "distance-label",
              html: `<div class="result-tooltip">${readableDistance(segmentDistance, true)}</div>`,
            }),
            interactive: false,
          }).addTo(map);

          // Adiciona o marcador ao array temporário para armazenar seus valores para a camada atual
          currentMarkers.push(label);
        }
      }
    }
  });

  map.on(L.Draw.Event.CREATED, (event: any) => {
    const { layerType, layer } = event;


    let popupContent = "";

    if (layerType === "circle") {
      const radius = layer.getRadius();
      const readableRadius = readableDistance(radius, true);
      popupContent = `<div>Raio: ${readableRadius}</div>`;
    } else if (layerType === "polyline") {
      // Associa os marcadores ao Map usando a camada finalizada
      layerMarkersMap.set(layer, currentMarkers);

      const latlngs = layer.getLatLngs();
      let totalDistance = 0;


      for (let i = 0; i < latlngs.length - 1; i++) {
        const pointA = latlngs[i];
        const pointB = latlngs[i + 1];
        totalDistance += pointA.distanceTo(pointB);
      }

      const readableDistanceTotal = readableDistance(totalDistance, true);
      popupContent = `<div>Distância: ${readableDistanceTotal}</div>`;

    } else if (layerType === "polygon") {
      const area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
      popupContent = `<div>Área: ${area.toFixed(2)} m²</div>`;
    } else {
      popupContent = `<div>Outro tipo de camada criado: ${layerType}</div>`;
    }

    // Adiciona o botão de remoção ao popup
    popupContent += `
          <button class="remove-layer-btn" style="margin-top: 8px; padding: 4px 8px; background-color: #ff4d4d; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Remover Camada
          </button>`;

    // Vincula o popup ao layer
    layer.bindPopup(popupContent);

    layer.on("popupopen", () => {
      document.querySelector(".remove-layer-btn")?.addEventListener("click", () => {
        editableLayers.removeLayer(layer);
        map.removeLayer(layer);

        // Remove apenas os marcadores associados à camada atual
        const markers = layerMarkersMap.get(layer);
        markers?.forEach(marker => map.removeLayer(marker));
        layerMarkersMap.delete(layer); // Remove a entrada do Map para a camada excluída
      });
    });

    editableLayers.addLayer(layer);
  });

  function readableDistance(distance: number, isMetric: boolean): string {
    let distanceStr: string;

    if (isMetric) {
      if (distance >= 1000) {
        distanceStr = (distance / 1000).toFixed(2) + " km";
      } else {
        distanceStr = distance.toFixed(1) + " m";
      }
    } else {
      const feet = distance * 3.28084;
      if (feet >= 5280) {
        distanceStr = (feet / 5280).toFixed(2) + " mi";
      } else {
        distanceStr = feet.toFixed(1) + " ft";
      }
    }

    return distanceStr;
  }

}

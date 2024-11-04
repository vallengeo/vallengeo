import L from "leaflet";
import "leaflet-draw";
import {DrawLocal} from "@/lib/mapa/DrawLocal";

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

  map.on(L.Draw.Event.DRAWSTART, (event: any) => {
    isPolyline = event.layerType === "polyline";

    if (event.layerType === "polyline") {
      latlngs = []; // Resetar as camadas ao iniciar um novo desenho
    }
  });

  map.on(L.Draw.Event.DRAWVERTEX, (event: any) => {
    const layers = event.layers.getLayers(); // Obtém todas as camadas desenhadas até agora

    if (isPolyline && layers.length > 0) {
      const layer = layers[layers.length - 1]; // Pegamos a última camada

      if (layer instanceof L.Marker) {
        latlngs.push(layer.getLatLng());

        // Verifique se é um array de `LatLng`
        if (latlngs.length > 1) {
          const lastPoint = latlngs[latlngs.length - 1]; // Último ponto
          const secondLastPoint = latlngs[latlngs.length - 2]; // Penúltimo ponto

          // Calcula a distância entre os dois últimos pontos
          const segmentDistance = secondLastPoint.distanceTo(lastPoint);

          // Cria um marcador ou label com a distância acumulada
          const label = L.marker(lastPoint, {
            icon: L.divIcon({
              className: "distance-label",
              html: `<div class="result-tooltip">
                                  ${readableDistance(segmentDistance, true)}
                             </div>`,
            }),
            interactive: false, // Não interativo para que não atrapalhe o desenho
          }).addTo(map);
        }
      }
    }
  });

  map.on(L.Draw.Event.CREATED, (event: any) => {
    const { layerType, layer } = event;

    if (layerType === "circle") {
      const radius = layer.getRadius();
      const readableRadius = readableDistance(radius, true);
      layer.bindPopup(`Raio: ${readableRadius}`);

    } else if (layerType === "polyline") {
      const latlngs = layer.getLatLngs();
      let totalDistance = 0;

      for (let i = 0; i < latlngs.length - 1; i++) {
        const pointA = latlngs[i];
        const pointB = latlngs[i + 1];
        totalDistance += pointA.distanceTo(pointB);
      }

      const readableDistanceTotal = readableDistance(totalDistance, true);
      layer.bindPopup(`Distância: ${readableDistanceTotal}`);

   
    } else if (layerType === "polygon") {
      const area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
      layer.bindPopup(`Área: ${area.toFixed(2)} m²`);

    } else {
      layer.bindPopup("Outro tipo de camada criado:", layerType);
    }

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

import L from "leaflet";

export const TILE_LAYER_CONFIG = {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png",
    options: {
      attribution:
        'Tiles &copy; <a href="http://www.esri.com/" target="_blank">Esri</a>',
        maxZoom: 19,
        tileSize: 512,
        zoomOffset: -1
    },
  }


export const DEFAULT_CONFIG = {
  center: L.latLng(-13.453737213419249, -55.06347656249999),
  zoom: 4,
  minZoom: 3,
  maxZoom: 19,
  doubleClickZoom: true,
  zoomControl: false,
  attributionControl: false,
  controles: {
    zoom: { enabled: true, position: "topright" },
    fullscreen: { enabled: true, position: "topright" },
    centralizar: { enabled: true, position: "bottomright" },
    escala: { enabled: true, position: "topright" },
  },
};

export const BASE_LAYERS_CONFIG = {
  "Satélite": L.tileLayer(
    `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png`,
    {
      attribution: 'Tiles &copy; <a href="http://www.esri.com/" target="_blank">Esri</a>',
      maxZoom: 19,
      tileSize: 512,
      zoomOffset: -1
    }
  ),

  "Terreno": L.tileLayer(
    `https://tile.openstreetmap.org/{z}/{x}/{y}.png`,
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      tileSize: 512,
      zoomOffset: -1
    }
  )
};

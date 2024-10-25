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
    medicao: { enabled: true, position: "topright" },
  },
};

export const BASE_LAYERS_CONFIG: { [key: string]: L.TileLayer } = {
  "Satélite": L.tileLayer(
    `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png`,
    {
      attribution: 'Tiles &copy; <a href="http://www.esri.com/" target="_blank">Esri</a>',
      maxZoom: 17
    }
  ),

  "Terreno": L.tileLayer(
    `https://tile.openstreetmap.org/{z}/{x}/{y}.png`,
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }
  ),
  "OpenStreetMaps": L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      minZoom: 2,
      maxZoom: 19,
      id: "osm.streets"
    }
  ),
  "Google Map": L.tileLayer(
    "https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",
    {
      minZoom: 2,
      maxZoom: 19,
      id: "google.street"
    }
  ),
  "Google Satélite": L.tileLayer(
    "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    {
      minZoom: 2,
      maxZoom: 19,
      id: "google.satellite"
    }
  ),
  "Google Hibrído": L.tileLayer(
    "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
    {
      minZoom: 2,
      maxZoom: 19,
      id: "google.hybrid"
    }
  )
};
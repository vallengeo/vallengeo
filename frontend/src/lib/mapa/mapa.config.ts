import L from "leaflet";

export const GEOSERVER_URL:string = process.env.NEXT_PUBLIC_GEOSERVER_URL!;

export const TILE_LAYER_CONFIG = {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png",
    options: {
      attribution:
        'Tiles &copy; <a href="http://www.esri.com/" target="_blank">Esri</a>',
        maxZoom: 17,
        tileSize: 512,
        zoomOffset: -1
    },
  }


export const DEFAULT_CONFIG = {
  center: L.latLng(-13.453737213419249, -55.06347656249999),
  zoom: 4,
  minZoom: 3,
  maxZoom: 17,
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
      maxZoom: 17,
      id: "Satélite"
    }
  ),

  "Terreno": L.tileLayer(
    `https://tile.openstreetmap.org/{z}/{x}/{y}.png`,
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 17,
      id: "Terreno"
    }
  ),
  "OpenStreetMaps": L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      minZoom: 2,
      maxZoom: 17,
      id: "OpenStreetMaps"
    }
  ),
  "Google Map": L.tileLayer(
    "https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",
    {
      minZoom: 2,
      maxZoom: 17,
      id: "Google Map"
    }
  ),
  "Google Satélite": L.tileLayer(
    "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    {
      minZoom: 2,
      maxZoom: 17,
      id: "Google Map"
    }
  ),
  "Google Hibrído": L.tileLayer(
    "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
    {
      minZoom: 2,
      maxZoom: 17,
      id: "Google Hibrído"
    }
  )
};
import L from "leaflet";

export const TILE_LAYER_CONFIG = 
//   {
//     nome: "Satélite",
//     url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png",
//     options: {
//       attribution:
//         'Tiles &copy; <a href="http://www.esri.com/" target="_blank">Esri</a>',
//         maxZoom: 20
//     },
//   }
  {
    url: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
    options: {
      attribution:
        'Map data &copy; <a href="https://www.google.com/maps">Google Maps</a>',
        maxZoom: 20
    },
  }
;

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

export const BASE_LAYERS_CONFIG = [
  {
    nome: "Satélite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png",
    attribution:
      'Tiles © <a href="http://www.esri.com/" target="_blank">Esri</a>',
    maxNativeZoom: 15,
    maxZoomLevel: 17,
    urlImagem: "basemap_satellite.png",
  },
  {
    nome: "Topomap",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    attribution:
      "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, " +
      "NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community",
    maxNativeZoom: 17,
    maxZoomLevel: 17,
    urlImagem: "basemap_topomap.png",
  },
];

export const URL_GEOSERVER = `${location.origin}${process.env.VUE_APP_HTTP_PATH}/camadas/wms`;
export const URL_WMS_SENTINEL = `${location.origin}${process.env.VUE_APP_HTTP_PATH}/camadas/sentinel/wms`;

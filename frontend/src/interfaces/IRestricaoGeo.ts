import { Feature } from 'geojson'
import L from 'leaflet'
export default interface IRestricaoGeo {
  camada: Feature | L.GeoJSON
  restricao: Feature | L.GeoJSON
}
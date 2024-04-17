import { Feature } from "geojson"

export default interface IGeometry {
    geometry: Feature | L.GeoJSON
  }
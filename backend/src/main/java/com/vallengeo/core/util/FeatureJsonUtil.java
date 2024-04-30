package com.vallengeo.core.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import org.geojson.GeoJsonObject;
import org.geotools.geojson.feature.FeatureJSON;
import org.geotools.geojson.geom.GeometryJSON;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.locationtech.jts.geom.Geometry;
import org.springframework.http.HttpStatus;
import org.wololo.jts2geojson.GeoJSONWriter;

import java.util.HashMap;

public class FeatureJsonUtil {
    private FeatureJsonUtil() {
    }

    public static Object convertGeometryJsonToFeatureJson(Geometry geometry) {
        return new GeoJSONWriter().write(geometry);
    }

    public static Object convertGeometryJsonToFeatureJsonWithProperties(Geometry geometry, Object properties) throws ParseException {

        ObjectMapper oMapper = new ObjectMapper();
        var map = oMapper.convertValue(properties, HashMap.class);
        String sb = "{\"type\":\"Feature\",\"properties\"" +
                    new JSONObject(map) +
                    ",\"geometry\":" + new GeometryJSON(15).toString(geometry) + "}";

        return new JSONParser().parse(sb);
    }

    public static Geometry checkAndConvertMultiPolygonToPolygon(Geometry geometry) {
        if (geometry.getNumGeometries() == 1 && geometry.getGeometryType().equalsIgnoreCase("MultiPolygon")) {
            return geometry.getGeometryN(0);
        }
        return geometry;
    }

    public static Geometry geojsonObjectToGeometry(GeoJsonObject geojsonObject) {
        try {
            String geojsonString = new ObjectMapper().writeValueAsString(geojsonObject);
            return parseGeoJson(geojsonString);
        } catch (Exception e) {
            throw new ValidatorException("Geometria inválida", HttpStatus.NOT_ACCEPTABLE);
        }
    }

    public static Geometry parseGeoJson(String geoJson) {
        try {
            if (geoJson.startsWith("[")) {
                geoJson = geoJson.substring(1, geoJson.length() - 1);
            }

            Geometry geometria = (Geometry) new FeatureJSON().readFeature(geoJson).getDefaultGeometry();

            if (geometria != null) {
                geometria.setSRID(4674);
                checkAndConvertMultiPolygonToPolygon(geometria);
            }

            return geometria;

        } catch (Exception e) {
            throw new ValidatorException("Geometria inválida", HttpStatus.NOT_ACCEPTABLE);
        }
    }
}

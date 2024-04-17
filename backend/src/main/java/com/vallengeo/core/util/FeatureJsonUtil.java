package com.vallengeo.core.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.geotools.geojson.geom.GeometryJSON;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.locationtech.jts.geom.Geometry;

import java.util.HashMap;

public class FeatureJsonUtil {

    public static Object convertGeometryJsonToFeatureJson(Geometry geometry) throws ParseException {

        String stringBuilder = "{\"type\":\"Feature\",\"properties\":{}," +
                               "\"geometry\":" +
                               new GeometryJSON(15).toString(geometry) +
                               "}";

        return new JSONParser().parse(stringBuilder);
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
}

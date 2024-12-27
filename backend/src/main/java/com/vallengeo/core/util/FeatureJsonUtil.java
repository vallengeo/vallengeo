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
import org.locationtech.jts.geom.*;
import org.locationtech.jts.io.WKTReader;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FeatureJsonUtil {
    private static final GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4674); // Usando SRID 4674 (SIRGAS_2000)
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

    public static Geometry checkAndConvertGeometryColletionToPolygon(Geometry geometry) {
        if (geometry.getNumGeometries() > 1 && geometry.getGeometryType().equalsIgnoreCase("GeometryCollection")) {
            List<Geometry> geometries = new ArrayList<>();
            for (int i = 0; i < geometry.getNumGeometries(); i++) {
                geometries.add(geometry.getGeometryN(i));
            }
            return combineGeometries(geometries);
        }
        return geometry;
    }
    public static Geometry checkAndConvertMultiPolygonToPolygon(Geometry geometry) {
        if (geometry.getNumGeometries() == 1 && geometry.getGeometryType().equalsIgnoreCase("MultiPolygon")) {
            return geometry.getGeometryN(0);
        }
        return geometry;
    }

    public static Geometry parseGeometria(String geometriaString) throws org.locationtech.jts.io.ParseException {
        WKTReader reader = new WKTReader();
        Geometry geometria = reader.read(geometriaString);
        geometria.setSRID(4674);
        return verifyAndModify(geometria);
    }

    public static Geometry combineGeometries(List<Geometry> geometries) {
        GeometryFactory geometryFactory = new GeometryFactory();
        GeometryCollection geometryCollection = geometryFactory.createGeometryCollection(geometries.toArray(new Geometry[0]));
        return geometryCollection.union(); // Combina todas as geometrias em uma única geometria
    }

    public static Geometry convertLinkedMapToGeometry(Map<String, Object> geometryMap) {
        String type = (String) geometryMap.get("type");

        return switch (type) {
            case "Point" -> createPoint((List<Double>) geometryMap.get("coordinates"));
            case "LineString" -> createLineString((List<List<Double>>) geometryMap.get("coordinates"));
            case "Polygon" -> createPolygon((List<List<List<Double>>>) geometryMap.get("coordinates"));
            case "MultiLineString" -> createMultiLineString((List<List<List<Double>>>) geometryMap.get("coordinates"));
            case "MultiPolygon" -> createMultiPolygon((List<List<List<List<Double>>>>) geometryMap.get("coordinates"));
            case "GeometryCollection" ->
                    createGeometryCollection((List<Map<String, Object>>) geometryMap.get("geometries"));
            default -> throw new IllegalArgumentException("Tipo de geometria desconhecido: " + type);
        };
    }

    private static Point createPoint(List<Double> coordinates) {
        double x = coordinates.get(0); // Longitude
        double y = coordinates.get(1); // Latitude
        Coordinate coordinate = new Coordinate(x, y);
        return geometryFactory.createPoint(coordinate);
    }

    private static LineString createLineString(List<List<Double>> coordinates) {
        Coordinate[] coords = new Coordinate[coordinates.size()];
        for (int i = 0; i < coordinates.size(); i++) {
            List<Double> coordList = coordinates.get(i);
            coords[i] = new Coordinate(coordList.get(0), coordList.get(1));
        }
        return geometryFactory.createLineString(coords);
    }

    private static Polygon createPolygon(List<List<List<Double>>> coordinates) {
        LinearRing shell = createLinearRing(coordinates.get(0));
        LinearRing[] holes = new LinearRing[coordinates.size() - 1];
        for (int i = 1; i < coordinates.size(); i++) {
            holes[i - 1] = createLinearRing(coordinates.get(i));
        }
        return geometryFactory.createPolygon(shell, holes);
    }

    private static LinearRing createLinearRing(List<List<Double>> coordinates) {
        Coordinate[] coords = new Coordinate[coordinates.size()];
        for (int i = 0; i < coordinates.size(); i++) {
            List<Double> coordList = coordinates.get(i);
            coords[i] = new Coordinate(coordList.get(0), coordList.get(1));
        }
        return geometryFactory.createLinearRing(coords);
    }
    private static MultiPolygon createMultiPolygon(List<List<List<List<Double>>>> coordinates) {
        Polygon[] polygons = new Polygon[coordinates.size()];
        for (int i = 0; i < coordinates.size(); i++) {
            polygons[i] = createPolygon(coordinates.get(i));
        }
        return geometryFactory.createMultiPolygon(polygons);
    }
    private static MultiLineString createMultiLineString(List<List<List<Double>>> coordinates) {
        LineString[] lineStrings = new LineString[coordinates.size()];
        for (int i = 0; i < coordinates.size(); i++) {
            lineStrings[i] = createLineString(coordinates.get(i));
        }
        return geometryFactory.createMultiLineString(lineStrings);
    }

    private static GeometryCollection createGeometryCollection(List<Map<String, Object>> geometries) {
        Geometry[] geometryArray = new Geometry[geometries.size()];
        for (int i = 0; i < geometries.size(); i++) {
            geometryArray[i] = convertLinkedMapToGeometry(geometries.get(i)); // Recursivamente converte as geometrias internas
        }
        return geometryFactory.createGeometryCollection(geometryArray);
    }

    private static Geometry verifyAndModify(Geometry geometry) {
        if (geometry.getGeometryType().equalsIgnoreCase("GeometryCollection")) {
            return checkAndConvertGeometryColletionToPolygon(geometry);
        } else if (geometry.getGeometryType().equalsIgnoreCase("MultiPolygon")) {
            return checkAndConvertMultiPolygonToPolygon(geometry);
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

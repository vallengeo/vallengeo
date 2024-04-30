package com.vallengeo.core.util;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.locationtech.jts.geom.Geometry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.wololo.jts2geojson.GeoJSONWriter;

import java.io.IOException;

@Component
public class GeometriySerializerUtil extends StdSerializer<Geometry> {

    @Autowired
    public GeometriySerializerUtil() {
        this(null);
    }

    public GeometriySerializerUtil(Class<Geometry> t) {
        super(t);
    }

    @Override
    public void serialize(Geometry geometry, JsonGenerator jgen, SerializerProvider provider)
            throws IOException {
        jgen.writeObject(new GeoJSONWriter().write(geometry));
    }
}

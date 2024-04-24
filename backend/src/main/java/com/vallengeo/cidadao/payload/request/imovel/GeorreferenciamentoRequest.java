package com.vallengeo.cidadao.payload.request.imovel;

import com.vallengeo.core.util.FeatureJsonUtil;
import lombok.Data;
import org.geojson.GeoJsonObject;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.Geometry;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
public class GeorreferenciamentoRequest implements Serializable {
    @NotNull
    private GeoJsonObject geoJson;

    public Geometry getGeometria() {
        Geometry g3D = FeatureJsonUtil.geojsonObjectToGeometry(this.geoJson);
        Geometry g2D = (Geometry) g3D.clone();
        for (Coordinate c : g2D.getCoordinates()) {
            c.setCoordinate(new Coordinate(c.x, c.y));
        }
        return g2D;
    }
}

package com.vallengeo.utils;

import net.bytebuddy.utility.RandomString;
import org.geotools.data.Transaction;
import org.geotools.data.shapefile.ShapefileDataStore;
import org.geotools.feature.DefaultFeatureCollection;
import org.geotools.feature.simple.SimpleFeatureBuilder;
import org.geotools.feature.simple.SimpleFeatureTypeBuilder;
import org.geotools.geometry.jts.JTSFactoryFinder;
import org.geotools.referencing.CRS;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Polygon;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;
import org.opengis.referencing.FactoryException;
import org.opengis.referencing.crs.CoordinateReferenceSystem;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class ArquivoTestUtils {
    public static byte[] createMockZipFile(MultipartFile... multipartFiles) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        try (ZipOutputStream zos = new ZipOutputStream(outputStream)) {
            ZipEntry entry;

            if (multipartFiles != null && multipartFiles.length > 0) {
                for (MultipartFile file: multipartFiles) {
                    entry = new ZipEntry(file.getOriginalFilename());
                    zos.putNextEntry(entry);

                    zos.write(file.getBytes());
                    zos.closeEntry();
                }
            } else {
                entry = new ZipEntry("test_file.txt");
                zos.putNextEntry(entry);

                zos.write("This is a test file.".getBytes());
                zos.closeEntry();
            }
        }

        return outputStream.toByteArray();
    }

    public static File createFile(String path, String nome, String extensao) {
        File file = new File(path + File.separator + nome + extensao);
        String content = RandomString.make(255);

        try(FileWriter writer = new FileWriter(file)) {
            writer.write(content);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return file;
    }

    public static MockMultipartFile mockMultipartFile(String name, String originalFilename, String contentType, byte[] content) {
        MockMultipartFile mockedMultipartFile = new MockMultipartFile(
                name, originalFilename, contentType, content);

        return mockedMultipartFile;
    }

    public static File createShapefile(Coordinate[] coordinates, String crsCode) throws IOException, FactoryException {
        CoordinateReferenceSystem crs = CRS.decode(crsCode);

        SimpleFeatureTypeBuilder featureTypeBuilder = new SimpleFeatureTypeBuilder();
        featureTypeBuilder.setName("Polygon Location");
        featureTypeBuilder.add("geom", Polygon.class);
        featureTypeBuilder.setCRS(crs);

        SimpleFeatureType featureType = featureTypeBuilder.buildFeatureType();
        GeometryFactory geometryFactory = JTSFactoryFinder.getGeometryFactory();
        SimpleFeatureBuilder featureBuilder = new SimpleFeatureBuilder(featureType);
        Polygon polygon = geometryFactory.createPolygon(coordinates);

        featureBuilder.add(polygon);
        SimpleFeature simpleFeature = featureBuilder.buildFeature(null);

        DefaultFeatureCollection featureCollection = new DefaultFeatureCollection();
        featureCollection.add(simpleFeature);

        File shapefile = File.createTempFile("shapefile_mock", ".shp");
        shapefile.deleteOnExit();

        ShapefileDataStore dataStore = new ShapefileDataStore(shapefile.toURI().toURL());
        dataStore.createSchema(featureType);
        dataStore.forceSchemaCRS(crs);

        try(var writer = dataStore.getFeatureWriterAppend(Transaction.AUTO_COMMIT)) {
            for (SimpleFeature feature: featureCollection) {
                SimpleFeature newFeature = writer.next();
                newFeature.setAttributes(feature.getAttributes());
                writer.write();
            }
        }

        return shapefile;
    }

    public static MockMultipartFile fileToMockMultipartFile(File file) {
        MockMultipartFile multipartFile = null;

        try {
            multipartFile =  new MockMultipartFile(
                    file.getName(),
                    file.getName(),
                    Files.probeContentType(file.toPath()),
                    Files.readAllBytes(file.toPath())
            );
        } catch (IOException e) {
            e.printStackTrace();
        }

        return multipartFile;
    }
}

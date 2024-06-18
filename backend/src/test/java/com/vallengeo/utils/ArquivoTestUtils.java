package com.vallengeo.utils;

import net.bytebuddy.utility.RandomString;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class ArquivoTestUtils {

    public static byte[] createMockZipFile() throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        try (ZipOutputStream zos = new ZipOutputStream(outputStream)) {

            // Adding a file entry to the zip
            ZipEntry entry = new ZipEntry("test_file.txt");
            zos.putNextEntry(entry);

            zos.write("This is a test file.".getBytes());
            zos.closeEntry();
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
}

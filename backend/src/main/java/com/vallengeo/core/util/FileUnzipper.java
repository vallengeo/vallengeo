package com.vallengeo.core.util;

import com.vallengeo.core.exceptions.InvalidFileException;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

public class FileUnzipper {
    private FileUnzipper() {
    }

    public static List<String> unzip(String zipFilePath, String destPath) {
        List<String> files = new ArrayList<>();
        try (ZipFile zipFile = new ZipFile(zipFilePath)) {
            File newDirectory = new File(destPath);
            newDirectory.mkdir();
            Enumeration<? extends ZipEntry> entries = zipFile.entries();
            while (entries.hasMoreElements()) {
                ZipEntry entry = entries.nextElement();
                if (entry.isDirectory()) {
                    File file = new File(destPath + File.separator + entry.getName());
                    if (!file.exists()) {
                        file.mkdir();
                    }
                } else {
                    try (InputStream inputStream = zipFile.getInputStream(entry);
                         FileOutputStream outputStream = new FileOutputStream(destPath + File.separator + entry.getName());
                    ) {
                        int data = inputStream.read();
                        while (data != -1) {
                            outputStream.write(data);
                            data = inputStream.read();
                        }
                    }
                    files.add(destPath + File.separator + entry.getName());
                }
            }
            return files;

        } catch (IOException e) {
            throw new InvalidFileException(Constants.FILE_INVALID_ERROR);
        }
    }
}

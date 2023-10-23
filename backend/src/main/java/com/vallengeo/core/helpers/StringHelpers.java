package com.vallengeo.core.helpers;

import com.vallengeo.core.config.Config;
import com.vallengeo.core.util.Constants;

import java.text.Normalizer;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class StringHelpers {
    private StringHelpers() {
        throw new IllegalStateException("Utility class");
    }

    public static String formatTimetable(Date s) {

        SimpleDateFormat dateFormat = new SimpleDateFormat(Config.DATE_FORMAT_TIME_TABLE);

        return dateFormat.format(s);
    }

    public static Date parseDateISO(String s) {

        try {

            return new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").parse(s);

        } catch (ParseException e) {
            return null;
        }

    }

    public static Date parseDateIncompleteISO(String s) {
        try {
            return new SimpleDateFormat("yyyy-MM-dd").parse(s);

        } catch (ParseException e) {
            return null;
        }

    }

    public static Date parseDateISOTimezone(String s) {
        try {

            return new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssX").parse(s);

        } catch (ParseException e) {
            return null;
        }

    }

    public static Date parseTimeOnly(String s) {
        return DateHelpers.setHours(new Date(Constants.FIRST_MILLISECONDS_DATE), Integer.parseInt(s.split(":")[0]), Integer.parseInt(s.split(":")[1]), 0, 0);
    }

    public static Date parseDate(String s) {
        try {
            return new SimpleDateFormat(Config.DATE_FORMAT).parse(s);

        } catch (ParseException e) {
            return null;
        }

    }

    public static Date parseDateTimetable(String s) {
        try {
            return new SimpleDateFormat(Config.DATE_FORMAT_TIME_TABLE).parse(s);

        } catch (ParseException e) {
            return null;

        }
    }

    public static String getNormalizedParam(String param) {
        try {

            return param == null ? null : '%' + (Normalizer.normalize(param.toLowerCase(), Normalizer.Form.NFD)
                    .replaceAll("[^\\p{ASCII}]", "").replaceAll("[.&,\\-)(?']", "")) + '%';

        } catch (Exception e) {
            return e.getMessage();
        }
    }

    public static String removeCharactersSpecial(String param) {
        try {
            return Normalizer
                    .normalize(param, Normalizer.Form.NFD)
                    .replaceAll("[^\\p{ASCII}]", "")
                    .replaceAll("[/.&,\\-)(?']", "");
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}

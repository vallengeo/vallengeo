package com.vallengeo.core.helpers;

import com.vallengeo.core.config.Config;
import org.apache.commons.lang3.time.DateUtils;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;

public class DateHelpers {

    private DateHelpers(){

    }

    public static Date setHours(Date date, int horas, int minutos, int segundos, int milisegundos) {

        Date data = DateUtils.setHours(date, horas);
        data = DateUtils.setMinutes(data, minutos);
        data = DateUtils.setSeconds(data, segundos);
        data = DateUtils.setMilliseconds(data, milisegundos);

        return data;

    }

    public static int getYear(Date date) {

        Calendar calendar = Calendar.getInstance();

        calendar.setTime(date);

        return calendar.get(Calendar.YEAR);

    }

    public static Calendar addYearsAndMonths(int year, int month) {

        Calendar calendar = Calendar.getInstance();

        calendar.add(Calendar.YEAR, year);
        calendar.add(Calendar.MONTH, month);

        return calendar;

    }

    public static String convertDecimalToTime(Double time) {

        DecimalFormat df = new DecimalFormat("00");

        if (time == null) {

            return df.format(0) + ":" + df.format(0);

        }

        String[] arr = String.valueOf(time).split("\\.");

        int hour = Integer.parseInt(arr[0]);
        int minutes = Integer.parseInt(arr[1]);

        return df.format(hour) + ":" + df.format(minutes);

    }

    public static int getDiffYears(Date first, Date last) {

        Calendar calendarFirst = getCalendar(first);
        Calendar calendarLast = getCalendar(last);

        int diff = calendarLast.get(Calendar.YEAR) - calendarFirst.get(Calendar.YEAR);

        if (calendarFirst.get(Calendar.MONTH) > calendarLast.get(Calendar.MONTH) || (calendarFirst.get(Calendar.MONTH) == calendarLast.get(Calendar.MONTH) && calendarFirst.get(Calendar.DATE) > calendarLast.get(Calendar.DATE))) {

            diff--;

        }

        return diff;

    }

    public static int getDiffMonths(Date first, Date last) {

        Calendar calendarFirst = getCalendar(first);
        Calendar calendarLast = getCalendar(last);

        int diffYear = calendarLast.get(Calendar.YEAR) - calendarFirst.get(Calendar.YEAR);

        return diffYear * 12 + calendarLast.get(Calendar.MONTH) - calendarFirst.get(Calendar.MONTH);

    }

    public static Calendar getCalendar(Date date) {

        Calendar cal = Calendar.getInstance();
        cal.setTime(date);

        return cal;

    }

    public static LocalDateTime convertDateToLocalDateTime(Date date) {
        return date.toInstant()
            .atZone(ZoneId.of("America/Sao_Paulo"))
            .toLocalDateTime();
    }

    public static String toString(Date date) {

        return new SimpleDateFormat(Config.DATE_FORMAT).format(date);

    }
}

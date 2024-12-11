package com.vallengeo.core.exceptions;

import com.vallengeo.core.exceptions.custom.enums.ExceptionTypesEnum;
import com.vallengeo.core.helpers.StringHelpers;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class ApiExceptionCustom {

    private final int status;
    private final String message;
    private final List<String> erros;
    private final String messageTitle;
    private final String error;
    private final String date;
    private final String exception;

    public ApiExceptionCustom(HttpStatus status, String message, String messageTitle, Exception exception) {

        this.status = status.value();
        this.error = status.getReasonPhrase();
        this.message = message;
        this.messageTitle = messageTitle;
        this.date = StringHelpers.formatTimetable(new Date());
        this.exception = exception.getClass().getName();
        this.erros = null;

    }

    public ApiExceptionCustom(HttpStatus status, String message, String messageTitle, Exception exception, List<String> erros) {

        this.status = status.value();
        this.error = status.getReasonPhrase();
        this.message = message;
        this.messageTitle = messageTitle;
        this.date = StringHelpers.formatTimetable(new Date());
        this.exception = exception.getClass().getName();
        this.erros = erros;

    }

    public ApiExceptionCustom(HttpStatus status, String message) {
        this.status = status.value();
        this.message = message;
        this.exception = String.valueOf(ExceptionTypesEnum.BAD_REQUEST_EXCEPTION);
        this.messageTitle = "Error";
        this.error = status.getReasonPhrase();
        this.date = StringHelpers.formatTimetable(new Date());
        this.erros = null;

    }
}


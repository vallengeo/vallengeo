package com.vallengeo.core.exceptions.custom;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.vallengeo.core.exceptions.custom.enums.ExceptionTypesEnum.FORBIDDEN_EXCEPTION;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class ForbiddenException extends RuntimeException {
    public ForbiddenException() {
        super(FORBIDDEN_EXCEPTION.getDescricao());
    }

    public ForbiddenException(String message) {
        super(message);
    }

    public ForbiddenException(String message, Throwable cause) {
        super(message, cause);
    }
}
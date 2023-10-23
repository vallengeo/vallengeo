package com.vallengeo.core.exceptions;

import com.vallengeo.core.exceptions.custom.BaseException;
import com.vallengeo.core.exceptions.custom.enums.ExceptionTypesEnum;
public class InvalidFileException extends BaseException {

    public InvalidFileException(String messageKey) {
        super(messageKey,  ExceptionTypesEnum.VALIDATION_EXCEPTION);
    }
}


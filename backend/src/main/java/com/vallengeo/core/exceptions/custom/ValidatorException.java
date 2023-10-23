package com.vallengeo.core.exceptions.custom;


import com.vallengeo.core.exceptions.custom.enums.ExceptionTypesEnum;

public class ValidatorException extends BaseException {

    public ValidatorException(String messageKey) {
        super(messageKey, ExceptionTypesEnum.VALIDATION_EXCEPTION);
    }
}

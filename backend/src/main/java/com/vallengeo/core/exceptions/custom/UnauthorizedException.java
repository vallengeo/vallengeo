package com.vallengeo.core.exceptions.custom;

import com.vallengeo.core.exceptions.custom.enums.ExceptionTypesEnum;

public class UnauthorizedException extends BaseException{

    public UnauthorizedException() {
        super();
    }

    public UnauthorizedException(String messageKey, Object... messageArgs) {
        super(messageKey, ExceptionTypesEnum.UNAUTHORIZED_EXCEPTION, messageArgs);
    }
}


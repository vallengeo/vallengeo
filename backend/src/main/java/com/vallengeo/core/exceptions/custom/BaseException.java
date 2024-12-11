package com.vallengeo.core.exceptions.custom;

import com.vallengeo.core.exceptions.custom.enums.ExceptionTypesEnum;
import com.vallengeo.core.helpers.Messages;
import lombok.Setter;

import static com.vallengeo.core.util.Constants.GENERAL_ERROR;

@Setter
public class BaseException extends RuntimeException {

    private final String messageKey;
    private final String messageTitle;
    private final transient Object[] messageArgs;

    public BaseException() {
        this.messageTitle = ExceptionTypesEnum.BASE_EXCEPTION.getDescricao();
        this.messageKey = GENERAL_ERROR;
        this.messageArgs = null;
    }

    public BaseException(String messageKey) {

        super(Messages.get(messageKey));
        this.messageKey = messageKey;
        this.messageTitle = ExceptionTypesEnum.BASE_EXCEPTION.getDescricao();
        this.messageArgs = null;
    }

    public BaseException(String messageKey, ExceptionTypesEnum exceptionType, Object... args) {

        super(Messages.get(messageKey, args));
        this.messageKey = messageKey;
        this.messageTitle = args.length > 0 && !String.valueOf(args[0]).isEmpty() ? Messages.get((String) args[0]) : exceptionType.getDescricao();
        this.messageArgs = args;
    }

    public String getUserMessage() {

        return Messages.get(this.messageKey, messageArgs);
    }

    public String getMessageTitle() {

        return this.messageTitle;
    }

}


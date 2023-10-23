package com.vallengeo.core.helpers;

import org.springframework.context.MessageSource;
import org.springframework.context.support.MessageSourceAccessor;

import javax.annotation.PostConstruct;

public class Messages {

    private static MessageSourceAccessor accessor;

    private final MessageSource messageSource;

    public Messages(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    public static String get(String code, Object... args) {

        return accessor != null ? accessor.getMessage(code, args) : code;

    }

    @PostConstruct
    private synchronized void init() {

        accessor = new MessageSourceAccessor(messageSource);

    }
}

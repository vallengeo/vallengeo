package com.vallengeo.core.exceptions;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

import java.io.Serial;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

import static com.vallengeo.core.util.Constants.PROBLEM_BASE_URL;

public class GenericHTTPException extends AbstractThrowableProblem {
    @Serial
    private static final long serialVersionUID = 1L;

    public GenericHTTPException(String message, Status status) {
        this(status.getReasonPhrase(), message, status);
    }

    public GenericHTTPException(String title, String message, Status status) {
        super(URI.create(PROBLEM_BASE_URL + "/problem-with-message"), title, status, null, null, null, getAlertParameters(message));
    }

    private static Map<String, Object> getAlertParameters(String errorKey) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("message", errorKey);
        return parameters;
    }
}


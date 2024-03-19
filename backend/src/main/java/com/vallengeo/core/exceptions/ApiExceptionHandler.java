package com.vallengeo.core.exceptions;

import com.google.common.base.Throwables;
import com.vallengeo.core.exceptions.custom.BadRequestException;
import com.vallengeo.core.exceptions.custom.BaseException;
import com.vallengeo.core.exceptions.custom.UnauthorizedException;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;

import static com.vallengeo.core.util.Constants.*;

@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {Exception.class})
    protected ResponseEntity<Object> handleApiRequestException(Exception ex) {

        logger.error(Throwables.getStackTraceAsString(ex));

        return new ResponseEntity<>(new ApiExceptionCustom(HttpStatus.INTERNAL_SERVER_ERROR, GENERAL_ERROR, "Ops!", ex), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        logger.error(Throwables.getStackTraceAsString(ex));
        List<String> errors = new ArrayList<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.add(error.getField() + ": " + error.getDefaultMessage());
        }
        for (ObjectError error : ex.getBindingResult().getGlobalErrors()) {
            errors.add(error.getObjectName() + ": " + error.getDefaultMessage());
        }

        return new ResponseEntity<>(new ApiExceptionCustom(HttpStatus.BAD_REQUEST, "Argumento(s) inválido(s).", "Falha na requisição!", ex, errors), HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(MissingServletRequestParameterException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        logger.error(Throwables.getStackTraceAsString(ex));

        return new ResponseEntity<>(new ApiExceptionCustom(HttpStatus.NOT_ACCEPTABLE, ex.getParameterName() + NOT_FOUND, PARAMETER_NOT_FOUND, ex), HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(value = {BaseException.class})
    protected ResponseEntity<Object> handleApiRequestException(BaseException ex) {

        logger.error(Throwables.getStackTraceAsString(ex));

        return new ResponseEntity<>(new ApiExceptionCustom(HttpStatus.NOT_IMPLEMENTED, ex.getUserMessage(), ex.getMessageTitle(), ex), HttpStatus.NOT_IMPLEMENTED);
    }

        @ExceptionHandler(value = {InvalidPasswordException.class})
    protected ResponseEntity<Object> handleApiRequestException(InvalidPasswordException ex) {

        logger.error(Throwables.getStackTraceAsString(ex));

        return new ResponseEntity<>(new ApiExceptionCustom(HttpStatus.NOT_ACCEPTABLE, ex.getUserMessage(), ex.getMessageTitle(), ex), HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(value = {TransactionSystemException.class})
    protected ResponseEntity<Object> handleApiRequestException(TransactionSystemException ex) {

        logger.error(Throwables.getStackTraceAsString(ex));

        Throwable cause = (ex).getRootCause();
        if (!(cause instanceof ConstraintViolationException)) {
            return new ResponseEntity<>(new ApiExceptionCustom(HttpStatus.NOT_ACCEPTABLE, ENTITY_VALITATION_ERROR, ENTITY_VALITATION_ERROR, ex), HttpStatus.NOT_ACCEPTABLE);
        }
        final List<String> errors = new ArrayList<>();
        for (final ConstraintViolation<?> violation : ((ConstraintViolationException) cause).getConstraintViolations()) {
            errors.add(violation.getPropertyPath() + ": " + violation.getMessage());
        }

        return new ResponseEntity<>(new ApiExceptionCustom(HttpStatus.NOT_ACCEPTABLE, ENTITY_VALITATION_ERROR, ENTITY_VALITATION_ERROR, (Exception) cause, errors), HttpStatus.NOT_ACCEPTABLE);

    }


    @ExceptionHandler(value = {ValidatorException.class})
    protected ResponseEntity<Object> handleApiRequestException(ValidatorException ex) {

        logger.error(Throwables.getStackTraceAsString(ex));

        return new ResponseEntity<>(new ApiExceptionCustom(ex.getStatus(), ex.getUserMessage(), ex.getMessageTitle(), ex), ex.getStatus());
    }

    @ExceptionHandler(value = {UnauthorizedException.class})
    protected ResponseEntity<Object> handleApiRequestException(UnauthorizedException ex) {

        logger.error(Throwables.getStackTraceAsString(ex));

        return new ResponseEntity<>(new ApiExceptionCustom(HttpStatus.UNAUTHORIZED, ex.getUserMessage(), ex.getMessageTitle(), ex), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler({AccessDeniedException.class})
    public ResponseEntity<Object> handleAccessDeniedException(AccessDeniedException ex) {
        logger.error(Throwables.getStackTraceAsString(ex));

        return new ResponseEntity<>(new ApiExceptionCustom(HttpStatus.UNAUTHORIZED, UNAUTHORIZED_ERROR, FALHA_AUTENTICACAO, ex), HttpStatus.UNAUTHORIZED);
    }

       @ExceptionHandler({ExpiredJwtException.class})
    public ResponseEntity<Object> handleExpiredJwtException(ExpiredJwtException ex) {
        logger.error(Throwables.getStackTraceAsString(ex));

        return new ResponseEntity<>(new ApiExceptionCustom(HttpStatus.FORBIDDEN, "Sessão expirada devido ao tempo de inatividade.", FALHA_AUTENTICACAO, ex), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(value = {BadCredentialsException.class})
    protected ResponseEntity<Object> handleApiRequestException(BadCredentialsException ex) {

        logger.error(Throwables.getStackTraceAsString(ex));

        return new ResponseEntity<>(new ApiExceptionCustom(HttpStatus.FORBIDDEN, "Usuário e/ou senha inválidos.", FALHA_AUTENTICACAO, ex), HttpStatus.FORBIDDEN);
    }
    @ExceptionHandler(value = {InternalAuthenticationServiceException.class})
    protected ResponseEntity<Object> handleApiRequestException(InternalAuthenticationServiceException ex) {

        logger.error(Throwables.getStackTraceAsString(ex));

        return new ResponseEntity<>(new ApiExceptionCustom(HttpStatus.FORBIDDEN, "Usuário e/ou senha inválidos.", FALHA_AUTENTICACAO, ex), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(value = {MaxUploadSizeExceededException.class})
    protected ResponseEntity<Object> handleApiRequestException(MaxUploadSizeExceededException ex) {

        logger.error(Throwables.getStackTraceAsString(ex));

        return new ResponseEntity<>(new ApiExceptionCustom(HttpStatus.NOT_ACCEPTABLE, MAX_UPLOAD_SIZE, FILE_NOT_PERMITED_ERROR, ex), HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(value = {FileNotFoundException.class})
    protected ResponseEntity<Object> handleApiRequestException(FileNotFoundException ex) {

        logger.error(Throwables.getStackTraceAsString(ex));

        return new ResponseEntity<>(new ApiExceptionCustom(HttpStatus.NOT_FOUND, ex.getMessage(), FILE_NOT_FOUND, ex), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = {DataIntegrityViolationException.class})
    protected ResponseEntity<Object> handleApiRequestException(DataIntegrityViolationException ex) {

        logger.error(Throwables.getStackTraceAsString(ex));

        return new ResponseEntity<>(new ApiExceptionCustom(HttpStatus.CONFLICT,  REQUEST_ERROR, REQUEST_ERROR, ex), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(value = {HttpClientErrorException.BadRequest.class})
    protected ResponseEntity<Object> handleApiRequestException(HttpClientErrorException.BadRequest ex) {

        logger.error(Throwables.getStackTraceAsString(ex));

        return new ResponseEntity<>(new ApiExceptionCustom(
                HttpStatus.BAD_REQUEST, ex.getMessage(), ex.getCause().getMessage(), ex),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiExceptionCustom> handleBadRequestException(BadRequestException bre) {
        return new ResponseEntity<>(new ApiExceptionCustom(HttpStatus.BAD_REQUEST, bre.getMessage()),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {MissingRequestHeaderException.class})
    protected ResponseEntity<Object> handleApiRequestException(MissingRequestHeaderException ex) {
        logger.error(Throwables.getStackTraceAsString(ex));

        return new ResponseEntity<>(new ApiExceptionCustom(HttpStatus.BAD_REQUEST, ex.getMessage(), "Falha", ex), HttpStatus.BAD_REQUEST);
    }
}


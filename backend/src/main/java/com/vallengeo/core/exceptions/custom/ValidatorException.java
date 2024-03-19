package com.vallengeo.core.exceptions.custom;


import com.vallengeo.core.exceptions.custom.enums.ExceptionTypesEnum;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class ValidatorException extends BaseException {
  private final HttpStatus status;
    public ValidatorException(String messageKey) {
        super(messageKey, ExceptionTypesEnum.VALIDATION_EXCEPTION);
        this.status = HttpStatus.BAD_REQUEST;
    }

     public ValidatorException(String messageKey, HttpStatus status) {
        super(messageKey, ExceptionTypesEnum.VALIDATION_EXCEPTION);
        this.status = status;
    }
}

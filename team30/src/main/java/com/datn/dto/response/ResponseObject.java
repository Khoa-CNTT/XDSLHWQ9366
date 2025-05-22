package com.datn.dto.response;/*
 * @project team30
 * @author Huy
 */

import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

public class ResponseObject <T> extends ResponseEntity<ResponseObject.Payload<T>> {
    public ResponseObject(HttpStatusCode statusCode, String message, T data) {
        super(new Payload<>(statusCode.value(), message, data), statusCode);
    }

    public static class Payload<T> {
        private int code;
        private String message;
        @JsonInclude(JsonInclude.Include.NON_NULL)
        private T data;

        public Payload(int code, String message, T data) {
            this.code = code;
            this.message = message;
            this.data = data;
        }

        public int getCode() {
            return code;
        }

        public String getMessage() {
            return message;
        }

        public T getData() {
            return data;
        }

        public static class Builder<T> {
            private int code;
            private String message;
            private T data;

            public Builder<T> code(int code) {
                this.code = code;
                return this;
            }

            public Builder<T> message(String message) {
                this.message = message;
                return this;
            }

            public Builder<T> data(T data) {
                this.data = data;
                return this;
            }

            public Payload<T> build() {
                return new Payload<>(code, message, data);
            }
        }

        public static <T> Builder<T> builder() {
            return new Builder<>();
        }
    }
}
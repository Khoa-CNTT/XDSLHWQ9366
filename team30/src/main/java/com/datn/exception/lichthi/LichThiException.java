package com.datn.exception.lichthi;/*
 * @project team30
 * @author Huy
 */

public class LichThiException extends RuntimeException {
    public LichThiException(String message) {
        super(message);
    }

    public LichThiException(String message, Throwable cause) {
        super(message, cause);
    }
}

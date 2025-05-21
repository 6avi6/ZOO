package com.polsl.tab.zoobackend.exception;

public class UnauthorizedException  extends RuntimeException {
    public UnauthorizedException (String message) {
        super(message);
    }
}

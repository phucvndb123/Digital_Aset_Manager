package com.inswave.training.dam.common;

import java.util.LinkedHashMap;
import java.util.Map;

public final class ApiResponse {

    private ApiResponse() {
    }

    public static Map<String, Object> success(Map<String, Object> body) {
        Map<String, Object> result = new LinkedHashMap<String, Object>();
        if (body != null) {
            result.putAll(body);
        }
        result.put("rsMsg", "OK");
        return result;
    }

    public static Map<String, Object> error(String message) {
        Map<String, Object> result = new LinkedHashMap<String, Object>();
        result.put("rsMsg", message == null ? "ERROR" : message);
        return result;
    }
}

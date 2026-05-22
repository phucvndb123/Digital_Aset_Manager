package com.inswave.training.dam.common;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Builds the common response envelope used by WebSquare submissions.
 */
public final class ApiResponse {

    /**
     * Prevents instantiation of this static helper.
     */
    private ApiResponse() {
    }

    /**
     * Copies response body data and appends the success result message.
     */
    public static Map<String, Object> success(Map<String, Object> body) {
        Map<String, Object> result = new LinkedHashMap<String, Object>();
        if (body != null) {
            result.putAll(body);
        }
        result.put("rsMsg", "OK");
        return result;
    }

    /**
     * Builds an error response envelope with a safe fallback message.
     */
    public static Map<String, Object> error(String message) {
        Map<String, Object> result = new LinkedHashMap<String, Object>();
        result.put("rsMsg", message == null ? "ERROR" : message);
        return result;
    }
}

package com.inswave.training.dam.common;

import org.junit.Test;


import java.util.LinkedHashMap;
import java.util.Map;

import static org.junit.Assert.*;

public class ApiResponseTest {

    @Test
    public void success_nullBody_returnsOnlyRsMsg() {
        Map<String, Object> result = ApiResponse.success(null);
        assertEquals(1, result.size());
        assertEquals("OK", result.get("rsMsg"));
    }

    @Test
    public void success_withBody_mergesBodyAndAddsRsMsg() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("key1", "value1");
        body.put("key2", 42);

        Map<String, Object> result = ApiResponse.success(body);

        assertEquals("value1", result.get("key1"));
        assertEquals(42, result.get("key2"));
        assertEquals("OK", result.get("rsMsg"));
        assertEquals(3, result.size());
    }

    @Test
    public void success_rsMsgAppearsLast() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("data", "test");

        Map<String, Object> result = ApiResponse.success(body);
        String[] keys = result.keySet().toArray(new String[0]);

        assertEquals("rsMsg", keys[keys.length - 1]);
    }

    @Test
    public void success_bodyIsNotMutated() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("k", "v");
        int originalSize = body.size();

        ApiResponse.success(body);

        assertEquals(originalSize, body.size());
        assertFalse(body.containsKey("rsMsg"));
    }

    @Test
    public void error_nullMessage_returnsErrorDefault() {
        Map<String, Object> result = ApiResponse.error(null);
        assertEquals("ERROR", result.get("rsMsg"));
        assertEquals(1, result.size());
    }

    @Test
    public void error_withMessage_returnsMessage() {
        Map<String, Object> result = ApiResponse.error("DB connection failed");
        assertEquals("DB connection failed", result.get("rsMsg"));
    }

    @Test
    public void error_emptyMessage_returnsEmptyString() {
        Map<String, Object> result = ApiResponse.error("");
        assertEquals("", result.get("rsMsg"));
    }
}

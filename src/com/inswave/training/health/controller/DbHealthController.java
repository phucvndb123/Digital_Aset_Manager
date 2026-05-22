package com.inswave.training.health.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Exposes a lightweight database health endpoint for local verification.
 */
@Controller
public class DbHealthController {

	@Autowired
	private DataSource dataSource;

	/**
	 * Executes a minimal query and returns database connection metadata.
	 */
	@GetMapping("/health/db")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> dbHealth() {
		Map<String, Object> result = new LinkedHashMap<String, Object>();
		result.put("endpoint", "/health/db");

		try (Connection con = dataSource.getConnection();
			 PreparedStatement ps = con.prepareStatement("SELECT 1");
			 ResultSet rs = ps.executeQuery()) {
			int value = rs.next() ? rs.getInt(1) : -1;
			result.put("status", "UP");
			result.put("query", "SELECT 1");
			result.put("result", value);
			result.put("databaseProduct", con.getMetaData().getDatabaseProductName());
			result.put("databaseVersion", con.getMetaData().getDatabaseProductVersion());
			return ResponseEntity.ok(result);
		} catch (Exception e) {
			result.put("status", "DOWN");
			result.put("error", e.getMessage());
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}
	}
}

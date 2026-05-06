package com.inswave.training.dam.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.inswave.training.dam.common.ApiResponse;
import com.inswave.training.dam.service.DashboardService;

@Controller
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @PostMapping("/getStats")
    @ResponseBody
    public Map<String, Object> getStats() {
        Map<String, Object> body = new LinkedHashMap<String, Object>();
        body.put("dma_stats", dashboardService.getStats());
        return ApiResponse.success(body);
    }

    @PostMapping("/getDistribution")
    @ResponseBody
    public Map<String, Object> getDistribution() {
        Map<String, Object> body = new LinkedHashMap<String, Object>();
        body.put("dlt_distribution", dashboardService.getDistribution());
        return ApiResponse.success(body);
    }

    @PostMapping("/getStorageTrend")
    @ResponseBody
    public Map<String, Object> getStorageTrend() {
        Map<String, Object> body = new LinkedHashMap<String, Object>();
        body.put("dlt_trend", dashboardService.getStorageTrend());
        return ApiResponse.success(body);
    }

    @PostMapping("/getRecentUploads")
    @ResponseBody
    public Map<String, Object> getRecentUploads() {
        Map<String, Object> body = new LinkedHashMap<String, Object>();
        body.put("dlt_recent", dashboardService.getRecentUploads());
        return ApiResponse.success(body);
    }
}

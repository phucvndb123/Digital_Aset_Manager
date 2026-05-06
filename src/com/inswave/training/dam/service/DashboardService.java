package com.inswave.training.dam.service;

import java.util.List;
import java.util.Map;

public interface DashboardService {

    Map<String, Object> getStats();

    List<Map<String, Object>> getDistribution();

    List<Map<String, Object>> getStorageTrend();

    List<Map<String, Object>> getRecentUploads();
}

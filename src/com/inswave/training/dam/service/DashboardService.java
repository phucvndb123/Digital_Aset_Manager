package com.inswave.training.dam.service;

import java.util.List;
import java.util.Map;

/**
 * Service contract for dashboard summaries and chart datasets.
 */
public interface DashboardService {

    /**
     * Returns aggregate dashboard counters.
     */
    Map<String, Object> getStats();

    /**
     * Returns file count distribution by type.
     */
    List<Map<String, Object>> getDistribution();

    /**
     * Returns storage usage trend by month.
     */
    List<Map<String, Object>> getStorageTrend();

    /**
     * Returns recently uploaded assets.
     */
    List<Map<String, Object>> getRecentUploads();
}

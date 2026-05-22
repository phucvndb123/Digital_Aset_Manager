package com.inswave.training.dam.mapper;

import java.util.List;
import java.util.Map;

/**
 * MyBatis mapper for dashboard aggregate and chart queries.
 */
public interface DashboardMapper {

    /**
     * Selects aggregate dashboard counters.
     */
    Map<String, Object> selectStats();

    /**
     * Selects file distribution rows by type.
     */
    List<Map<String, Object>> selectDistribution();

    /**
     * Selects monthly storage trend rows.
     */
    List<Map<String, Object>> selectStorageTrend();

    /**
     * Selects recent upload activity rows.
     */
    List<Map<String, Object>> selectRecentUploads();
}

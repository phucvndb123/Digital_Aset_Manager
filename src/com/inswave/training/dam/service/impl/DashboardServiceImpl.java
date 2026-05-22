package com.inswave.training.dam.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inswave.training.dam.mapper.DashboardMapper;
import com.inswave.training.dam.service.DashboardService;

/**
 * Default dashboard service implementation with null-safe mapper results.
 */
@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private DashboardMapper dashboardMapper;

    /**
     * Loads aggregate counters, returning an empty map when the query has no row.
     */
    @Override
    public Map<String, Object> getStats() {
        Map<String, Object> stats = dashboardMapper.selectStats();
        return stats == null ? Collections.<String, Object>emptyMap() : stats;
    }

    /**
     * Loads file distribution rows, returning an empty list when there is no data.
     */
    @Override
    public List<Map<String, Object>> getDistribution() {
        List<Map<String, Object>> rows = dashboardMapper.selectDistribution();
        return rows == null ? Collections.<Map<String, Object>>emptyList() : rows;
    }

    /**
     * Loads monthly storage trend rows, returning an empty list when there is no data.
     */
    @Override
    public List<Map<String, Object>> getStorageTrend() {
        List<Map<String, Object>> rows = dashboardMapper.selectStorageTrend();
        return rows == null ? Collections.<Map<String, Object>>emptyList() : rows;
    }

    /**
     * Loads recent upload rows, returning an empty list when there is no data.
     */
    @Override
    public List<Map<String, Object>> getRecentUploads() {
        List<Map<String, Object>> rows = dashboardMapper.selectRecentUploads();
        return rows == null ? Collections.<Map<String, Object>>emptyList() : rows;
    }
}

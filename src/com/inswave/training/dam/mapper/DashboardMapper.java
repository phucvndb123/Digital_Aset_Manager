package com.inswave.training.dam.mapper;

import java.util.List;
import java.util.Map;

public interface DashboardMapper {

    Map<String, Object> selectStats();

    List<Map<String, Object>> selectDistribution();

    List<Map<String, Object>> selectStorageTrend();

    List<Map<String, Object>> selectRecentUploads();
}

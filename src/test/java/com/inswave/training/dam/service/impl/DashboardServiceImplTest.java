package com.inswave.training.dam.service.impl;

import com.inswave.training.dam.mapper.DashboardMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.*;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class DashboardServiceImplTest {

    @Mock
    private DashboardMapper dashboardMapper;

    @InjectMocks
    private DashboardServiceImpl dashboardService;

    // --- getStats ---

    @Test
    public void getStats_whenMapperReturnsData_returnsSameMap() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalFiles", 100);
        stats.put("storageGb", 4.5);
        when(dashboardMapper.selectStats()).thenReturn(stats);

        Map<String, Object> result = dashboardService.getStats();

        assertSame(stats, result);
        assertEquals(100, result.get("totalFiles"));
    }

    @Test
    public void getStats_whenMapperReturnsNull_returnsEmptyMap() {
        when(dashboardMapper.selectStats()).thenReturn(null);

        Map<String, Object> result = dashboardService.getStats();

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    // --- getDistribution ---

    @Test
    public void getDistribution_whenMapperReturnsData_returnsSameList() {
        List<Map<String, Object>> rows = Arrays.asList(
                Collections.singletonMap("fileType", "Images")
        );
        when(dashboardMapper.selectDistribution()).thenReturn(rows);

        List<Map<String, Object>> result = dashboardService.getDistribution();

        assertSame(rows, result);
        assertEquals("Images", result.get(0).get("fileType"));
    }

    @Test
    public void getDistribution_whenMapperReturnsNull_returnsEmptyList() {
        when(dashboardMapper.selectDistribution()).thenReturn(null);

        List<Map<String, Object>> result = dashboardService.getDistribution();

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    // --- getStorageTrend ---

    @Test
    public void getStorageTrend_whenMapperReturnsData_returnsSameList() {
        List<Map<String, Object>> rows = Arrays.asList(
                Collections.singletonMap("month", "2025-01")
        );
        when(dashboardMapper.selectStorageTrend()).thenReturn(rows);

        List<Map<String, Object>> result = dashboardService.getStorageTrend();

        assertSame(rows, result);
        assertEquals("2025-01", result.get(0).get("month"));
    }

    @Test
    public void getStorageTrend_whenMapperReturnsNull_returnsEmptyList() {
        when(dashboardMapper.selectStorageTrend()).thenReturn(null);

        assertTrue(dashboardService.getStorageTrend().isEmpty());
    }

    // --- getRecentUploads ---

    @Test
    public void getRecentUploads_whenMapperReturnsData_returnsSameList() {
        List<Map<String, Object>> rows = Arrays.asList(
                Collections.singletonMap("fileNm", "photo.jpg")
        );
        when(dashboardMapper.selectRecentUploads()).thenReturn(rows);

        List<Map<String, Object>> result = dashboardService.getRecentUploads();

        assertSame(rows, result);
        assertEquals("photo.jpg", result.get(0).get("fileNm"));
    }

    @Test
    public void getRecentUploads_whenMapperReturnsNull_returnsEmptyList() {
        when(dashboardMapper.selectRecentUploads()).thenReturn(null);

        assertTrue(dashboardService.getRecentUploads().isEmpty());
    }
}

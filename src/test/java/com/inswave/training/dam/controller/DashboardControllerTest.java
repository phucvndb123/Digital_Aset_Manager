package com.inswave.training.dam.controller;

import com.inswave.training.dam.service.DashboardService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.*;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(MockitoJUnitRunner.class)
public class DashboardControllerTest {

    @Mock
    private DashboardService dashboardService;

    @InjectMocks
    private DashboardController dashboardController;

    private MockMvc mockMvc;

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(dashboardController).build();
    }

    // --- POST /api/dashboard/getStats ---

    @Test
    public void getStats_returns200WithDmaStatsAndRsMsg() throws Exception {
        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("totalFiles", 42);
        stats.put("storageGb", 3.7);
        when(dashboardService.getStats()).thenReturn(stats);

        mockMvc.perform(post("/api/dashboard/getStats"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.dma_stats.totalFiles").value(42))
                .andExpect(jsonPath("$.rsMsg").value("OK"));
    }

    @Test
    public void getStats_whenServiceReturnsEmpty_returnsEmptyStatsWithRsMsg() throws Exception {
        when(dashboardService.getStats()).thenReturn(Collections.emptyMap());

        mockMvc.perform(post("/api/dashboard/getStats"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.rsMsg").value("OK"))
                .andExpect(jsonPath("$.dma_stats").isMap());
    }

    // --- POST /api/dashboard/getDistribution ---

    @Test
    public void getDistribution_returns200WithDltDistributionAndRsMsg() throws Exception {
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("fileType", "Images");
        row.put("ratio", 45.0);
        when(dashboardService.getDistribution()).thenReturn(Arrays.asList(row));

        mockMvc.perform(post("/api/dashboard/getDistribution"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.dlt_distribution[0].fileType").value("Images"))
                .andExpect(jsonPath("$.rsMsg").value("OK"));
    }

    @Test
    public void getDistribution_whenEmpty_returnsEmptyArrayWithRsMsg() throws Exception {
        when(dashboardService.getDistribution()).thenReturn(Collections.emptyList());

        mockMvc.perform(post("/api/dashboard/getDistribution"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.dlt_distribution").isArray())
                .andExpect(jsonPath("$.rsMsg").value("OK"));
    }

    // --- POST /api/dashboard/getStorageTrend ---

    @Test
    public void getStorageTrend_returns200WithDltTrendAndRsMsg() throws Exception {
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("month", "2025-01");
        row.put("totalSizeGb", 1.2);
        when(dashboardService.getStorageTrend()).thenReturn(Arrays.asList(row));

        mockMvc.perform(post("/api/dashboard/getStorageTrend"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.dlt_trend[0].month").value("2025-01"))
                .andExpect(jsonPath("$.rsMsg").value("OK"));
    }

    // --- POST /api/dashboard/getRecentUploads ---

    @Test
    public void getRecentUploads_returns200WithDltRecentAndRsMsg() throws Exception {
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("fileNm", "report.pdf");
        row.put("timeAgo", "2 hours ago");
        when(dashboardService.getRecentUploads()).thenReturn(Arrays.asList(row));

        mockMvc.perform(post("/api/dashboard/getRecentUploads"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.dlt_recent[0].fileNm").value("report.pdf"))
                .andExpect(jsonPath("$.rsMsg").value("OK"));
    }

    @Test
    public void getRecentUploads_whenEmpty_returnsEmptyArrayWithRsMsg() throws Exception {
        when(dashboardService.getRecentUploads()).thenReturn(Collections.emptyList());

        mockMvc.perform(post("/api/dashboard/getRecentUploads"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.dlt_recent").isArray())
                .andExpect(jsonPath("$.rsMsg").value("OK"));
    }
}

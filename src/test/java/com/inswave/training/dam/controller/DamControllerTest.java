package com.inswave.training.dam.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.inswave.training.dam.service.DamService;
import com.inswave.training.dam.vo.*;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(MockitoJUnitRunner.class)
public class DamControllerTest {

    @Mock
    private DamService damService;

    @InjectMocks
    private DamController damController;

    private MockMvc mockMvc;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(damController).build();
    }

    // --- GET /api/dam/folders ---

    @Test
    public void getFolders_returns200WithFolderList() throws Exception {
        DamFolderVo folder = new DamFolderVo();
        folder.setFolderId(1);
        folder.setFolderNm("Root");
        when(damService.getFolderTree()).thenReturn(Arrays.asList(folder));

        mockMvc.perform(get("/api/dam/folders"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].folderId").value(1))
                .andExpect(jsonPath("$[0].folderNm").value("Root"));
    }

    @Test
    public void getFolders_whenEmpty_returns200WithEmptyArray() throws Exception {
        when(damService.getFolderTree()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/dam/folders"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$").isEmpty());
    }

    // --- GET /api/dam/assets?folderId={id} ---

    @Test
    public void getAssets_returns200WithAssetList() throws Exception {
        DamAssetVo asset = new DamAssetVo();
        asset.setAssetId(10);
        asset.setFileNm("photo.jpg");
        asset.setFileType("Images");
        when(damService.getAssetsByFolderId(2)).thenReturn(Arrays.asList(asset));

        mockMvc.perform(get("/api/dam/assets").param("folderId", "2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].assetId").value(10))
                .andExpect(jsonPath("$[0].fileNm").value("photo.jpg"))
                .andExpect(jsonPath("$[0].fileType").value("Images"));
    }

    @Test
    public void getAssets_passesCorrectFolderIdToService() throws Exception {
        when(damService.getAssetsByFolderId(5)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/dam/assets").param("folderId", "5"))
                .andExpect(status().isOk());

        verify(damService).getAssetsByFolderId(5);
    }

    // --- GET /api/dam/assets/{assetId} ---

    @Test
    public void getAsset_returns200WithAssetAndVersions() throws Exception {
        DamAssetVo asset = new DamAssetVo();
        asset.setAssetId(5);
        asset.setFileNm("report.pdf");

        DamVersionVo version = new DamVersionVo();
        version.setVerId(1);
        version.setVerNo("v1.0");

        when(damService.getAssetById(5)).thenReturn(asset);
        when(damService.getVersionsByAssetId(5)).thenReturn(Arrays.asList(version));

        mockMvc.perform(get("/api/dam/assets/5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.asset.assetId").value(5))
                .andExpect(jsonPath("$.asset.fileNm").value("report.pdf"))
                .andExpect(jsonPath("$.versions[0].verId").value(1))
                .andExpect(jsonPath("$.versions[0].verNo").value("v1.0"));
    }

    @Test
    public void getAsset_responseAlwaysHasBothKeys() throws Exception {
        when(damService.getAssetById(1)).thenReturn(new DamAssetVo());
        when(damService.getVersionsByAssetId(1)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/dam/assets/1"))
                .andExpect(jsonPath("$.asset").exists())
                .andExpect(jsonPath("$.versions").isArray());
    }

    // --- PUT /api/dam/assets/{assetId} ---

    @Test
    public void updateAsset_setsAssetIdFromPath_andReturnsUpdatedCount() throws Exception {
        DamAssetVo body = new DamAssetVo();
        body.setFileNm("renamed.jpg");
        body.setStatus("Published");

        when(damService.updateAsset(any(DamAssetVo.class))).thenReturn(1);

        mockMvc.perform(put("/api/dam/assets/5")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.updated").value(1));

        verify(damService).updateAsset(argThat(vo -> Integer.valueOf(5).equals(vo.getAssetId())));
    }

    @Test
    public void updateAsset_ignoresAssetIdInRequestBody() throws Exception {
        DamAssetVo body = new DamAssetVo();
        body.setAssetId(999);
        body.setFileNm("test.jpg");
        body.setStatus("Draft");

        when(damService.updateAsset(any(DamAssetVo.class))).thenReturn(1);

        mockMvc.perform(put("/api/dam/assets/7")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)))
                .andExpect(status().isOk());

        // Path variable (7) must override body assetId (999)
        verify(damService).updateAsset(argThat(vo -> Integer.valueOf(7).equals(vo.getAssetId())));
    }

    // --- PUT /api/dam/assets/{assetId}/versions/{verId} ---

    @Test
    public void updateVersion_setsAssetIdAndVerIdFromPath() throws Exception {
        DamVersionVo body = new DamVersionVo();
        body.setVerNo("v2.0");
        body.setChangeLog("Updated layout");

        when(damService.updateVersion(any(DamVersionVo.class))).thenReturn(1);

        mockMvc.perform(put("/api/dam/assets/5/versions/3")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.updated").value(1));

        verify(damService).updateVersion(argThat(vo ->
                Integer.valueOf(5).equals(vo.getAssetId()) && Integer.valueOf(3).equals(vo.getVerId())));
    }

    // --- POST /api/dam/assets/{assetId}/versions ---

    @Test
    public void createVersion_setsAssetIdFromPath_andReturnsCreatedWithVerId() throws Exception {
        DamVersionVo body = new DamVersionVo();
        body.setVerNo("v1.1");
        body.setChangeLog("Minor fix");

        when(damService.createVersion(any(DamVersionVo.class))).thenAnswer(inv -> {
            DamVersionVo vo = inv.getArgument(0);
            vo.setVerId(99);
            return 1;
        });

        mockMvc.perform(post("/api/dam/assets/5/versions")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.created").value(1))
                .andExpect(jsonPath("$.verId").value(99));

        verify(damService).createVersion(argThat(vo -> Integer.valueOf(5).equals(vo.getAssetId())));
    }
}

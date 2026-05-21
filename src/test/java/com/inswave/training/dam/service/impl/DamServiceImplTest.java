package com.inswave.training.dam.service.impl;

import com.inswave.training.dam.mapper.DamMapper;
import com.inswave.training.dam.vo.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class DamServiceImplTest {

    @Mock
    private DamMapper damMapper;

    @InjectMocks
    private DamServiceImpl damService;

    @Test
    public void getFolderTree_delegatesToMapper_andReturnsSameList() {
        List<DamFolderVo> folders = Arrays.asList(new DamFolderVo());
        when(damMapper.selectFolderTree()).thenReturn(folders);

        List<DamFolderVo> result = damService.getFolderTree();

        assertSame(folders, result);
        verify(damMapper).selectFolderTree();
    }

    @Test
    public void getAssetsByFolderId_delegatesWithCorrectId() {
        Integer folderId = 7;
        List<DamAssetVo> assets = Arrays.asList(new DamAssetVo());
        when(damMapper.selectAssetsByFolderId(folderId)).thenReturn(assets);

        List<DamAssetVo> result = damService.getAssetsByFolderId(folderId);

        assertSame(assets, result);
        verify(damMapper).selectAssetsByFolderId(folderId);
    }

    @Test
    public void getAssetById_delegatesAndReturnsAsset() {
        Integer assetId = 42;
        DamAssetVo asset = new DamAssetVo();
        asset.setAssetId(assetId);
        when(damMapper.selectAssetById(assetId)).thenReturn(asset);

        DamAssetVo result = damService.getAssetById(assetId);

        assertSame(asset, result);
        assertEquals(assetId, result.getAssetId());
        verify(damMapper).selectAssetById(assetId);
    }

    @Test
    public void getVersionsByAssetId_delegatesWithCorrectId() {
        Integer assetId = 3;
        List<DamVersionVo> versions = Arrays.asList(new DamVersionVo());
        when(damMapper.selectVersionsByAssetId(assetId)).thenReturn(versions);

        List<DamVersionVo> result = damService.getVersionsByAssetId(assetId);

        assertSame(versions, result);
        verify(damMapper).selectVersionsByAssetId(assetId);
    }

    @Test
    public void updateAsset_delegatesAndReturnsAffectedRows() {
        DamAssetVo vo = new DamAssetVo();
        when(damMapper.updateAsset(vo)).thenReturn(1);

        int result = damService.updateAsset(vo);

        assertEquals(1, result);
        verify(damMapper).updateAsset(vo);
    }

    @Test
    public void updateAsset_whenNoRowsAffected_returnsZero() {
        DamAssetVo vo = new DamAssetVo();
        when(damMapper.updateAsset(vo)).thenReturn(0);

        assertEquals(0, damService.updateAsset(vo));
    }

    @Test
    public void updateVersion_delegatesAndReturnsAffectedRows() {
        DamVersionVo vo = new DamVersionVo();
        when(damMapper.updateVersion(vo)).thenReturn(1);

        int result = damService.updateVersion(vo);

        assertEquals(1, result);
        verify(damMapper).updateVersion(vo);
    }

    @Test
    public void createVersion_delegatesToInsertVersionAndReturnsResult() {
        DamVersionVo vo = new DamVersionVo();
        when(damMapper.insertVersion(vo)).thenReturn(1);

        int result = damService.createVersion(vo);

        assertEquals(1, result);
        verify(damMapper).insertVersion(vo);
    }
}

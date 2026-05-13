package com.inswave.training.dam.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inswave.training.dam.mapper.DamMapper;
import com.inswave.training.dam.service.DamService;
import com.inswave.training.dam.vo.DamAssetVo;
import com.inswave.training.dam.vo.DamFolderVo;
import com.inswave.training.dam.vo.DamVersionVo;

@Service
public class DamServiceImpl implements DamService {

	@Autowired
	private DamMapper damMapper;

	@Override
	public List<DamFolderVo> getFolderTree() {
		return damMapper.selectFolderTree();
	}

	@Override
	public List<DamAssetVo> getAssetsByFolderId(Integer folderId) {
		return damMapper.selectAssetsByFolderId(folderId);
	}

	@Override
	public DamAssetVo getAssetById(Integer assetId) {
		return damMapper.selectAssetById(assetId);
	}

	@Override
	public List<DamVersionVo> getVersionsByAssetId(Integer assetId) {
		return damMapper.selectVersionsByAssetId(assetId);
	}

	@Override
	public int updateAsset(DamAssetVo vo) {
		return damMapper.updateAsset(vo);
	}
}
package com.inswave.training.dam.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inswave.training.dam.mapper.DamMapper;
import com.inswave.training.dam.service.DamService;
import com.inswave.training.dam.vo.DamAssetVo;
import com.inswave.training.dam.vo.DamFolderVo;
import com.inswave.training.dam.vo.DamVersionVo;

/**
 * Default DAM service implementation that delegates persistence to MyBatis mappers.
 */
@Service
public class DamServiceImpl implements DamService {

	@Autowired
	private DamMapper damMapper;

	/**
	 * Loads the folder tree for the left navigation panels.
	 */
	@Override
	public List<DamFolderVo> getFolderTree() {
		return damMapper.selectFolderTree();
	}

	/**
	 * Loads assets for a selected folder.
	 */
	@Override
	public List<DamAssetVo> getAssetsByFolderId(Integer folderId) {
		return damMapper.selectAssetsByFolderId(folderId);
	}

	/**
	 * Loads a single asset's metadata.
	 */
	@Override
	public DamAssetVo getAssetById(Integer assetId) {
		return damMapper.selectAssetById(assetId);
	}

	/**
	 * Loads all versions linked to an asset.
	 */
	@Override
	public List<DamVersionVo> getVersionsByAssetId(Integer assetId) {
		return damMapper.selectVersionsByAssetId(assetId);
	}

	/**
	 * Persists edited asset metadata.
	 */
	@Override
	public int updateAsset(DamAssetVo vo) {
		return damMapper.updateAsset(vo);
	}

	/**
	 * Persists edited version metadata.
	 */
	@Override
	public int updateVersion(DamVersionVo vo) {
		return damMapper.updateVersion(vo);
	}

	/**
	 * Persists a newly created asset version.
	 */
	@Override
	public int createVersion(DamVersionVo vo) {
		return damMapper.insertVersion(vo);
	}
}

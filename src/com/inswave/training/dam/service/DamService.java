package com.inswave.training.dam.service;

import java.util.List;

import com.inswave.training.dam.vo.DamAssetVo;
import com.inswave.training.dam.vo.DamFolderVo;
import com.inswave.training.dam.vo.DamVersionVo;

/**
 * Service contract for Digital Asset Manager folder, asset, and version workflows.
 */
public interface DamService {
	/**
	 * Loads all folders in tree order data form.
	 */
	List<DamFolderVo> getFolderTree();

	/**
	 * Loads assets under a folder.
	 */
	List<DamAssetVo> getAssetsByFolderId(Integer folderId);

	/**
	 * Loads one asset by primary key.
	 */
	DamAssetVo getAssetById(Integer assetId);

	/**
	 * Loads version history for an asset.
	 */
	List<DamVersionVo> getVersionsByAssetId(Integer assetId);

	/**
	 * Updates metadata for an asset.
	 */
	int updateAsset(DamAssetVo vo);
	
	/**
	 * Updates an existing version row.
	 */
	int updateVersion(DamVersionVo vo);
	
	/**
	 * Inserts a new version row.
	 */
	int createVersion(DamVersionVo vo);
}

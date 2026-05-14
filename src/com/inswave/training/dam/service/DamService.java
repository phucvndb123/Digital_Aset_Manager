package com.inswave.training.dam.service;

import java.util.List;

import com.inswave.training.dam.vo.DamAssetVo;
import com.inswave.training.dam.vo.DamAccessLogVo;
import com.inswave.training.dam.vo.DamFolderVo;
import com.inswave.training.dam.vo.DamVersionVo;

public interface DamService {
	List<DamFolderVo> getFolderTree();

	List<DamAssetVo> getAssetsByFolderId(Integer folderId);

	DamAssetVo getAssetById(Integer assetId);

	List<DamVersionVo> getVersionsByAssetId(Integer assetId);

	int updateAsset(DamAssetVo vo);
	
	int updateVersion(DamVersionVo vo);
	
	int createVersion(DamVersionVo vo);
}
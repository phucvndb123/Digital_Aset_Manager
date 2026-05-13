package com.inswave.training.dam.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.inswave.training.dam.vo.DamAssetVo;
import com.inswave.training.dam.vo.DamAccessLogVo;
import com.inswave.training.dam.vo.DamFolderVo;
import com.inswave.training.dam.vo.DamVersionVo;

public interface DamMapper {
	List<DamFolderVo> selectFolderTree();

	List<DamAssetVo> selectAssetsByFolderId(@Param("folderId") Integer folderId);

	DamAssetVo selectAssetById(@Param("assetId") Integer assetId);

	List<DamVersionVo> selectVersionsByAssetId(@Param("assetId") Integer assetId);

	int updateAsset(@Param("vo") DamAssetVo vo);
}
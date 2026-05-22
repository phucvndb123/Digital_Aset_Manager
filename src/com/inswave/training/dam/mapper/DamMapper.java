package com.inswave.training.dam.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.inswave.training.dam.vo.DamAssetVo;
import com.inswave.training.dam.vo.DamFolderVo;
import com.inswave.training.dam.vo.DamVersionVo;

/**
 * MyBatis mapper for DAM folder, asset, and version persistence operations.
 */
public interface DamMapper {
	/**
	 * Selects all folders needed to build the folder tree.
	 */
	List<DamFolderVo> selectFolderTree();

	/**
	 * Selects assets under a folder.
	 */
	List<DamAssetVo> selectAssetsByFolderId(@Param("folderId") Integer folderId);

	/**
	 * Selects one asset by id.
	 */
	DamAssetVo selectAssetById(@Param("assetId") Integer assetId);

	/**
	 * Selects all versions for an asset.
	 */
	List<DamVersionVo> selectVersionsByAssetId(@Param("assetId") Integer assetId);

	/**
	 * Updates asset metadata columns.
	 */
	int updateAsset(@Param("vo") DamAssetVo vo);
	
	/**
	 * Updates version metadata columns.
	 */
	int updateVersion(@Param("vo") DamVersionVo vo);
	
	/**
	 * Inserts a new version row.
	 */
	int insertVersion(@Param("vo") DamVersionVo vo);
}

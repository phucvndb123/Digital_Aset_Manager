package com.inswave.training.dam.vo;

public class DamFolderVo {
	private Integer folderId;
	private String folderNm;
	private Integer parentFolderId;
	private Integer pathDepth;

	public Integer getFolderId() {
		return folderId;
	}

	public void setFolderId(Integer folderId) {
		this.folderId = folderId;
	}

	public String getFolderNm() {
		return folderNm;
	}

	public void setFolderNm(String folderNm) {
		this.folderNm = folderNm;
	}

	public Integer getParentFolderId() {
		return parentFolderId;
	}

	public void setParentFolderId(Integer parentFolderId) {
		this.parentFolderId = parentFolderId;
	}

	public Integer getPathDepth() {
		return pathDepth;
	}

	public void setPathDepth(Integer pathDepth) {
		this.pathDepth = pathDepth;
	}
}
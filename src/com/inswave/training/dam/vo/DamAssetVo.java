package com.inswave.training.dam.vo;

public class DamAssetVo {
	private Integer assetId;
	private String fileNm;
	private Integer folderId;
	private String fileType;
	private Long fileSize;
	private String ownerNm;
	private String uploadDt;

	public Integer getAssetId() {
		return assetId;
	}

	public void setAssetId(Integer assetId) {
		this.assetId = assetId;
	}

	public String getFileNm() {
		return fileNm;
	}

	public void setFileNm(String fileNm) {
		this.fileNm = fileNm;
	}

	public Integer getFolderId() {
		return folderId;
	}

	public void setFolderId(Integer folderId) {
		this.folderId = folderId;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public Long getFileSize() {
		return fileSize;
	}

	public void setFileSize(Long fileSize) {
		this.fileSize = fileSize;
	}

	public String getOwnerNm() {
		return ownerNm;
	}

	public void setOwnerNm(String ownerNm) {
		this.ownerNm = ownerNm;
	}

	public String getUploadDt() {
		return uploadDt;
	}

	public void setUploadDt(String uploadDt) {
		this.uploadDt = uploadDt;
	}
}
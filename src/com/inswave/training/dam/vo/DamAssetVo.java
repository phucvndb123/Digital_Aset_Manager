package com.inswave.training.dam.vo;

/**
 * Value object representing editable metadata for a digital asset.
 */
public class DamAssetVo {
	private Integer assetId;
	private String fileNm;
	private Integer folderId;
	private String fileType;
	private String fileExt;
	private Long fileSize;
	private String ownerNm;
	private String status;
	private String tags;
	private String description;
	private String previewUrl;
	private String resolution;
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

	public String getFileExt() {
		return fileExt;
	}

	public void setFileExt(String fileExt) {
		this.fileExt = fileExt;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTags() {
		return tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPreviewUrl() {
		return previewUrl;
	}

	public void setPreviewUrl(String previewUrl) {
		this.previewUrl = previewUrl;
	}

	public String getResolution() {
		return resolution;
	}

	public void setResolution(String resolution) {
		this.resolution = resolution;
	}

	public String getUploadDt() {
		return uploadDt;
	}

	public void setUploadDt(String uploadDt) {
		this.uploadDt = uploadDt;
	}
}

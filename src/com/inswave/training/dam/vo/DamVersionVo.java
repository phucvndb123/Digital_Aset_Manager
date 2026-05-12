package com.inswave.training.dam.vo;

public class DamVersionVo {
	private Integer verId;
	private Integer assetId;
	private String verNo;
	private String fileUrl;
	private String previewUrl;
	private String changeLog;
	private String ownerNm;
	private String uploadDt;

	public Integer getVerId() {
		return verId;
	}

	public void setVerId(Integer verId) {
		this.verId = verId;
	}

	public Integer getAssetId() {
		return assetId;
	}

	public void setAssetId(Integer assetId) {
		this.assetId = assetId;
	}

	public String getVerNo() {
		return verNo;
	}

	public void setVerNo(String verNo) {
		this.verNo = verNo;
	}

	public String getFileUrl() {
		return fileUrl;
	}

	public void setFileUrl(String fileUrl) {
		this.fileUrl = fileUrl;
	}

	public String getPreviewUrl() {
		return previewUrl;
	}

	public void setPreviewUrl(String previewUrl) {
		this.previewUrl = previewUrl;
	}

	public String getChangeLog() {
		return changeLog;
	}

	public void setChangeLog(String changeLog) {
		this.changeLog = changeLog;
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

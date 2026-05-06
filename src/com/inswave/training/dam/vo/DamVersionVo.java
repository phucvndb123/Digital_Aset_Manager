package com.inswave.training.dam.vo;

public class DamVersionVo {
	private Integer verId;
	private Integer assetId;
	private String verNo;
	private String fileUrl;
	private String changeLog;

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

	public String getChangeLog() {
		return changeLog;
	}

	public void setChangeLog(String changeLog) {
		this.changeLog = changeLog;
	}
}
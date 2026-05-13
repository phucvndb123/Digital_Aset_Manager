package com.inswave.training.dam.vo;

public class DamAccessLogVo {
	private Integer logId;
	private Integer assetId;
	private String userNm;
	private String actionTp;
	private String actionDt;
	private String remark;

	public Integer getLogId() {
		return logId;
	}

	public void setLogId(Integer logId) {
		this.logId = logId;
	}

	public Integer getAssetId() {
		return assetId;
	}

	public void setAssetId(Integer assetId) {
		this.assetId = assetId;
	}

	public String getUserNm() {
		return userNm;
	}

	public void setUserNm(String userNm) {
		this.userNm = userNm;
	}

	public String getActionTp() {
		return actionTp;
	}

	public void setActionTp(String actionTp) {
		this.actionTp = actionTp;
	}

	public String getActionDt() {
		return actionDt;
	}

	public void setActionDt(String actionDt) {
		this.actionDt = actionDt;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
}


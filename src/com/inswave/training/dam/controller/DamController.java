package com.inswave.training.dam.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.inswave.training.dam.service.DamService;

@Controller
@RequestMapping("/api/dam")
public class DamController {

	@Autowired
	private DamService damService;

	@GetMapping("/folders")
	@ResponseBody
	public ResponseEntity<?> getFolders() {
		return ResponseEntity.ok(damService.getFolderTree());
	}

	@GetMapping("/assets")
	@ResponseBody
	public ResponseEntity<?> getAssets(@RequestParam("folderId") Integer folderId) {
		return ResponseEntity.ok(damService.getAssetsByFolderId(folderId));
	}

	@GetMapping("/assets/{assetId}")
	@ResponseBody
	public ResponseEntity<?> getAsset(@PathVariable("assetId") Integer assetId) {
		Map<String, Object> result = new LinkedHashMap<String, Object>();
		result.put("asset", damService.getAssetById(assetId));
		result.put("versions", damService.getVersionsByAssetId(assetId));
		return ResponseEntity.ok(result);
	}

	@GetMapping("/assets/{assetId}/access-logs")
	@ResponseBody
	public ResponseEntity<?> getAccessLogs(@PathVariable("assetId") Integer assetId) {
		return ResponseEntity.ok(damService.getAccessLogsByAssetId(assetId));
	}

	@PostMapping("/assets/{assetId}/restore")
	@ResponseBody
	public ResponseEntity<?> restore(@PathVariable("assetId") Integer assetId, @RequestParam("verId") Integer verId,
			@RequestParam(value = "userNm", required = false) String userNm) {
		if (userNm == null || userNm.trim().isEmpty()) {
			userNm = "SYSTEM";
		}
		int affected = damService.restoreVersion(assetId, verId, userNm);
		Map<String, Object> result = new LinkedHashMap<String, Object>();
		result.put("ok", affected > 0);
		return ResponseEntity.ok(result);
	}
}
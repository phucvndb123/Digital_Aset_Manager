package com.inswave.training.dam.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.inswave.training.dam.vo.DamVersionVo;
import com.inswave.training.dam.service.DamService;
import com.inswave.training.dam.vo.DamAssetVo;

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

	@PutMapping("/assets/{assetId}")
	@ResponseBody
	public ResponseEntity<?> updateAsset(@PathVariable("assetId") Integer assetId,
			@RequestBody DamAssetVo vo) {
		vo.setAssetId(assetId);
		int updated = damService.updateAsset(vo);
		Map<String, Object> result = new LinkedHashMap<String, Object>();
		result.put("updated", updated);
		return ResponseEntity.ok(result);
	}
	@PutMapping("/assets/{assetId}/versions/{verId}")
	@ResponseBody
	public ResponseEntity<?> updateVersion(@PathVariable("assetId") Integer assetId,
			@PathVariable("verId") Integer verId,
			@RequestBody DamVersionVo vo) {
		vo.setAssetId(assetId);
		vo.setVerId(verId);
		int updated = damService.updateVersion(vo);
		Map<String, Object> result = new LinkedHashMap<String, Object>();
		result.put("updated", updated);
		return ResponseEntity.ok(result);
	}
	@PostMapping("/assets/{assetId}/versions")
	@ResponseBody
	public ResponseEntity<?> createVersion(@PathVariable("assetId") Integer assetId,
			@RequestBody DamVersionVo vo) {
		vo.setAssetId(assetId);
		int created = damService.createVersion(vo);
		Map<String, Object> result = new LinkedHashMap<String, Object>();
		result.put("created", created);
		result.put("verId", vo.getVerId());
		return ResponseEntity.ok(result);
	}
}
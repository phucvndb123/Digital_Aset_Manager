/**
 * dam-utils.js — Pure utility functions cho Digital Asset Manager
 * Các hàm này không phụ thuộc WebSquare/$p/scwin, dùng được trong cả
 * browser lẫn Node.js (để unit test).
 */

/* eslint-disable no-var */
(function (root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();         // Node.js / Jest
    } else {
        root.DamUtils = factory();          // Browser global
    }
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    /* ─── File size formatting ──────────────────────────────────────── */

    /**
     * Format bytes thành chuỗi dễ đọc (GB / MB / KB / B).
     * @param {number|string} bytes
     * @returns {string}
     */
    function formatFileSize(bytes) {
        if (!bytes || Number(bytes) === 0) { return '-'; }
        var n = Number(bytes);
        if (isNaN(n) || n < 0)            { return '-'; }
        if (n >= 1073741824) { return (n / 1073741824).toFixed(1) + ' GB'; }
        if (n >= 1048576)    { return (n / 1048576).toFixed(1) + ' MB'; }
        if (n >= 1024)       { return (n / 1024).toFixed(1) + ' KB'; }
        return n + ' B';
    }

    /* ─── Folder tree builder ───────────────────────────────────────── */

    /**
     * Chuyển flat folder list từ API thành rows có DEPTH cho w2:treeview.
     * @param {Array<{folderId, folderNm, parentFolderId}>} folders
     * @returns {Array<{FOLDER_ID, FOLDER_NM, DEPTH}>}
     */
    function buildFolderRows(folders) {
        if (!folders || !folders.length) { return []; }
        var childrenMap = {};
        var allIds      = {};
        for (var i = 0; i < folders.length; i++) { allIds[folders[i].folderId] = true; }
        for (var i = 0; i < folders.length; i++) {
            var pid = folders[i].parentFolderId || 0;
            if (!childrenMap[pid]) { childrenMap[pid] = []; }
            childrenMap[pid].push(folders[i]);
        }
        var roots = [];
        for (var i = 0; i < folders.length; i++) {
            var f = folders[i];
            if (!f.parentFolderId || !allIds[f.parentFolderId]) { roots.push(f); }
        }
        var result = [];
        function visit(node, depth) {
            result.push({ FOLDER_ID: String(node.folderId), FOLDER_NM: node.folderNm || '', DEPTH: String(depth) });
            var children = childrenMap[node.folderId] || [];
            for (var j = 0; j < children.length; j++) { visit(children[j], depth + 1); }
        }
        for (var i = 0; i < roots.length; i++) { visit(roots[i], 1); }
        return result;
    }

    /* ─── Validation ────────────────────────────────────────────────── */

    var VALID_STATUSES = ['Draft', 'Published', 'Archived', 'Review', 'Inactive'];

    /**
     * Validate File Name.
     * @param {string} name
     * @returns {{ ok: boolean, msg?: string }}
     */
    function validateFileName(name) {
        if (!name || name.trim() === '')  { return { ok: false, msg: 'File Name không được để trống.' }; }
        if (name.trim().length > 200)     { return { ok: false, msg: 'File Name tối đa 200 ký tự.' }; }
        if (/[\/\\:*?"<>|]/.test(name))   { return { ok: false, msg: 'File Name không được chứa: / \\ : * ? " < > |' }; }
        return { ok: true };
    }

    /**
     * Validate Status.
     * @param {string} status
     * @returns {{ ok: boolean, msg?: string }}
     */
    function validateStatus(status) {
        if (!status || status.trim() === '')           { return { ok: false, msg: 'Vui lòng chọn Status.' }; }
        if (VALID_STATUSES.indexOf(status) === -1)    { return { ok: false, msg: 'Status không hợp lệ.' }; }
        return { ok: true };
    }

    /**
     * Validate Tags (optional field, tối đa 10, mỗi tag ≤ 50 ký tự).
     * @param {string} tagStr  comma-separated
     * @returns {{ ok: boolean, msg?: string }}
     */
    function validateTags(tagStr) {
        if (!tagStr || tagStr.trim() === '') { return { ok: true }; }
        var tags = tagStr.split(',').map(function (t) { return t.trim(); }).filter(function (t) { return t !== ''; });
        if (tags.length > 10)               { return { ok: false, msg: 'Tối đa 10 tags.' }; }
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].length > 50)        { return { ok: false, msg: 'Mỗi tag tối đa 50 ký tự.' }; }
        }
        return { ok: true };
    }

    /* ─── Icon generator ────────────────────────────────────────────── */

    var FILE_ICON_COLORS = {
        'PDF':  '#f44336', 'DOC':  '#1e88e5', 'DOCX': '#1e88e5',
        'XLS':  '#43a047', 'XLSX': '#43a047', 'PPT':  '#ff7043', 'PPTX': '#ff7043',
        'JPG':  '#43a047', 'JPEG': '#43a047', 'PNG':  '#1e88e5',
        'GIF':  '#8e24aa', 'SVG':  '#00897b', 'PSD':  '#5e35b1',
        'MP4':  '#fb8c00', 'MOV':  '#f4511e', 'AVI':  '#f4511e',
        'MP3':  '#3949ab', 'WAV':  '#3949ab', 'AAC':  '#3949ab',
        'ZIP':  '#546e7a', 'RAR':  '#546e7a', '7Z':   '#546e7a'
    };

    /**
     * Tạo SVG data URL hình tài liệu với band màu + chữ extension.
     * @param {string} ext  ví dụ 'PDF', 'JPG'
     * @returns {string}  data:image/svg+xml;...
     */
    function makeFileIcon(ext) {
        var color = FILE_ICON_COLORS[ext] || '#546e7a';
        var lbl   = (ext || 'FILE').substring(0, 4);
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40">'
            + '<path d="M2,0 L22,0 L32,10 L32,40 L2,40 Z" fill="#ffffff" stroke="#d1d5db" stroke-width="1.5"/>'
            + '<path d="M22,0 L22,10 L32,10 Z" fill="#e5e7eb"/>'
            + '<rect x="2" y="26" width="30" height="14" fill="' + color + '"/>'
            + '<text x="16" y="37" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="#ffffff" text-anchor="middle">' + lbl + '</text>'
            + '</svg>';
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }

    /* ─── Public API ─────────────────────────────────────────────────── */
    return {
        formatFileSize:   formatFileSize,
        buildFolderRows:  buildFolderRows,
        validateFileName: validateFileName,
        validateStatus:   validateStatus,
        validateTags:     validateTags,
        makeFileIcon:     makeFileIcon,
        VALID_STATUSES:   VALID_STATUSES
    };
}));

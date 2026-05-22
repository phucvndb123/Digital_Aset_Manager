/**
 * dam-utils.js - common utility, validation, message, and UI helpers for DAM.
 *
 * The pure helpers work in both browser and Node.js so they can be unit tested.
 */

/* eslint-disable no-var */
(function (root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        root.DamUtils = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    var VALID_STATUSES = ['Draft', 'Published', 'Archived', 'Review', 'Inactive'];
    var VALID_ASSET_TYPES = ['Documents', 'Images', 'Videos', 'Audio'];

    var MESSAGES = {
        'dam.common.ok': 'OK',
        'dam.common.cancel': 'Cancel',
        'dam.common.confirm': 'Confirm',
        'dam.validation.required': 'Please enter {0}.',
        'dam.validation.selectRequired': 'Please select {0}.',
        'dam.validation.maxLength': '{0} must be no more than {1} characters.',
        'dam.validation.number': '{0} must be a valid number.',
        'dam.validation.numberMin': '{0} must be greater than or equal to {1}.',
        'dam.validation.numberMax': '{0} must be less than or equal to {1}.',
        'dam.validation.email': '{0} must be a valid email address.',
        'dam.validation.phone': '{0} must be a valid phone number.',
        'dam.validation.fileName.invalidChar': 'File Name cannot contain: / \\ : * ? " < > |',
        'dam.validation.status': 'Status is invalid.',
        'dam.validation.assetType': 'Asset Type is invalid.',
        'dam.validation.tags.maxCount': 'You can add up to {0} tags.',
        'dam.validation.tags.maxLength': 'Each tag must be no more than {0} characters.',
        'dam.validation.fileSize': 'File Size must be a number or a valid size such as 12 MB.',
        'dam.asset.selectRequired': 'Please select an asset before submitting.',
        'dam.asset.changeLogRequired': 'Change Log is required to create a new version.',
        'dam.asset.updateFailed': 'Could not update the asset information in the database.',
        'dam.asset.versionCreateFailed': 'Could not create a new version in the database.',
        'dam.asset.submitSuccess': 'Submitted successfully. The asset was updated and a new version was created: {0}.',
        'dam.version.assetMissing': 'Could not find the asset to update.',
        'dam.version.notFound': 'No version was found in the database to update.',
        'dam.version.updateSuccess': 'Version updated successfully.',
        'dam.confirm.saveChanges': 'Are you sure you want to save these changes?',
        'dam.confirm.submitVersion': 'Are you sure you want to update this asset and create a new version?',
        'dam.confirm.updateVersion': 'Are you sure you want to update this version?',
        'dam.api.saveFailed': 'Save failed. HTTP {0}.',
        'dam.api.networkFailed': 'Could not connect to the server. Please try again.'
    };

    var FILE_ICON_COLORS = {
        PDF:  '#f44336', DOC:  '#1e88e5', DOCX: '#1e88e5',
        XLS:  '#43a047', XLSX: '#43a047', PPT:  '#ff7043', PPTX: '#ff7043',
        JPG:  '#43a047', JPEG: '#43a047', PNG:  '#1e88e5',
        GIF:  '#8e24aa', SVG:  '#00897b', PSD:  '#5e35b1',
        MP4:  '#fb8c00', MOV:  '#f4511e', AVI:  '#f4511e',
        MP3:  '#3949ab', WAV:  '#3949ab', AAC:  '#3949ab',
        ZIP:  '#546e7a', RAR:  '#546e7a', '7Z': '#546e7a'
    };

    /**
     * Returns true when value is null/undefined or only whitespace.
     * @param {*} value
     * @returns {boolean}
     */
    function isBlank(value) {
        return value == null || String(value).trim() === '';
    }

    /**
     * Formats a message template using {0}, {1}, ... placeholders.
     * @param {string} template
     * @param {Array=} args
     * @returns {string}
     */
    function formatMessage(template, args) {
        var msg = String(template == null ? '' : template);
        var list = args || [];
        for (var i = 0; i < list.length; i++) {
            msg = msg.replace(new RegExp('\\{' + i + '\\}', 'g'), list[i]);
        }
        return msg;
    }

    /**
     * Resolves a common message key, with optional WebSquare language-pack support.
     * @param {string|Array} messageKey
     * @param {Array=} args
     * @returns {string}
     */
    function getMessage(messageKey, args) {
        var key = messageKey;
        var params = args || [];
        if (Object.prototype.toString.call(messageKey) === '[object Array]') {
            key = messageKey[0];
            params = messageKey.slice(1);
        }

        var template = '';
        try {
            if (typeof WebSquare !== 'undefined' && WebSquare.WebSquareLang && WebSquare.WebSquareLang[key]) {
                template = WebSquare.WebSquareLang[key];
            }
        } catch (e) {}
        if (!template) { template = MESSAGES[key] || key || ''; }
        return formatMessage(template, params);
    }

    /**
     * Resolves either a raw message or a common message key.
     * @param {string|Array} messageOrKey
     * @param {Array=} args
     * @returns {string}
     */
    function resolveMessage(messageOrKey, args) {
        if (Object.prototype.toString.call(messageOrKey) === '[object Array]') {
            return getMessage(messageOrKey);
        }
        if (MESSAGES[messageOrKey]) {
            return getMessage(messageOrKey, args);
        }
        return formatMessage(messageOrKey || '', args || []);
    }

    /**
     * Formats bytes into a human-readable size.
     * @param {number|string} bytes
     * @returns {string}
     */
    function formatFileSize(bytes) {
        if (!bytes || Number(bytes) === 0) { return '-'; }
        var n = Number(bytes);
        if (isNaN(n) || n < 0) { return '-'; }
        if (n >= 1073741824) { return (n / 1073741824).toFixed(1) + ' GB'; }
        if (n >= 1048576)    { return (n / 1048576).toFixed(1) + ' MB'; }
        if (n >= 1024)       { return (n / 1024).toFixed(1) + ' KB'; }
        return n + ' B';
    }

    /**
     * Converts a flat folder API response to WebSquare treeview rows.
     * @param {Array<{folderId, folderNm, parentFolderId}>} folders
     * @returns {Array<{FOLDER_ID: string, FOLDER_NM: string, DEPTH: string}>}
     */
    function buildFolderRows(folders) {
        if (!folders || !folders.length) { return []; }
        var childrenMap = {};
        var allIds = {};
        for (var i = 0; i < folders.length; i++) { allIds[folders[i].folderId] = true; }
        for (var j = 0; j < folders.length; j++) {
            var pid = folders[j].parentFolderId || 0;
            if (!childrenMap[pid]) { childrenMap[pid] = []; }
            childrenMap[pid].push(folders[j]);
        }
        var roots = [];
        for (var k = 0; k < folders.length; k++) {
            var f = folders[k];
            if (!f.parentFolderId || !allIds[f.parentFolderId]) { roots.push(f); }
        }
        var result = [];
        function visit(node, depth) {
            result.push({ FOLDER_ID: String(node.folderId), FOLDER_NM: node.folderNm || '', DEPTH: String(depth) });
            var children = childrenMap[node.folderId] || [];
            for (var c = 0; c < children.length; c++) { visit(children[c], depth + 1); }
        }
        for (var r = 0; r < roots.length; r++) { visit(roots[r], 1); }
        return result;
    }

    /**
     * Validates a DAM file name.
     * @param {string} name
     * @returns {{ ok: boolean, msg?: string }}
     */
    function validateFileName(name) {
        if (isBlank(name)) { return { ok: false, msg: getMessage('dam.validation.required', ['File Name']) }; }
        if (String(name).trim().length > 200) {
            return { ok: false, msg: getMessage('dam.validation.maxLength', ['File Name', 200]) };
        }
        if (/[\/\\:*?"<>|]/.test(name)) {
            return { ok: false, msg: getMessage('dam.validation.fileName.invalidChar') };
        }
        return { ok: true };
    }

    /**
     * Validates DAM status values.
     * @param {string} status
     * @returns {{ ok: boolean, msg?: string }}
     */
    function validateStatus(status) {
        if (isBlank(status)) { return { ok: false, msg: getMessage('dam.validation.selectRequired', ['Status']) }; }
        if (VALID_STATUSES.indexOf(status) === -1) {
            return { ok: false, msg: getMessage('dam.validation.status') };
        }
        return { ok: true };
    }

    /**
     * Validates optional comma-separated tags.
     * @param {string} tagStr
     * @returns {{ ok: boolean, msg?: string }}
     */
    function validateTags(tagStr) {
        if (isBlank(tagStr)) { return { ok: true }; }
        var tags = String(tagStr).split(',').map(function (t) { return t.trim(); }).filter(function (t) { return t !== ''; });
        if (tags.length > 10) { return { ok: false, msg: getMessage('dam.validation.tags.maxCount', [10]) }; }
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].length > 50) {
                return { ok: false, msg: getMessage('dam.validation.tags.maxLength', [50]) };
            }
        }
        return { ok: true };
    }

    /**
     * Validates a required value.
     * @param {*} value
     * @param {string} label
     * @returns {{ ok: boolean, msg?: string }}
     */
    function validateRequired(value, label) {
        if (isBlank(value)) { return { ok: false, msg: getMessage('dam.validation.required', [label || 'Value']) }; }
        return { ok: true };
    }

    /**
     * Validates max string length.
     * @param {*} value
     * @param {number} maxLength
     * @param {string} label
     * @returns {{ ok: boolean, msg?: string }}
     */
    function validateMaxLength(value, maxLength, label) {
        if (!isBlank(value) && String(value).length > maxLength) {
            return { ok: false, msg: getMessage('dam.validation.maxLength', [label || 'Value', maxLength]) };
        }
        return { ok: true };
    }

    /**
     * Parses a number that may contain comma thousands separators.
     * @param {*} value
     * @returns {number}
     */
    function parseNumber(value) {
        if (typeof value === 'number') { return isFinite(value) ? value : NaN; }
        if (isBlank(value)) { return NaN; }
        var raw = String(value).trim();
        if (!/^[+-]?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(raw)) { return NaN; }
        return Number(raw.replace(/,/g, ''));
    }

    /**
     * Validates numeric input.
     * @param {*} value
     * @param {{required?: boolean, min?: number, max?: number, label?: string}=} options
     * @returns {{ ok: boolean, msg?: string }}
     */
    function validateNumber(value, options) {
        var opt = options || {};
        var label = opt.label || 'Value';
        if (isBlank(value)) {
            return opt.required ? { ok: false, msg: getMessage('dam.validation.required', [label]) } : { ok: true };
        }
        var n = parseNumber(value);
        if (isNaN(n)) { return { ok: false, msg: getMessage('dam.validation.number', [label]) }; }
        if (opt.min != null && n < opt.min) {
            return { ok: false, msg: getMessage('dam.validation.numberMin', [label, opt.min]) };
        }
        if (opt.max != null && n > opt.max) {
            return { ok: false, msg: getMessage('dam.validation.numberMax', [label, opt.max]) };
        }
        return { ok: true };
    }

    /**
     * Validates optional or required email input.
     * @param {*} value
     * @param {{required?: boolean, label?: string}=} options
     * @returns {{ ok: boolean, msg?: string }}
     */
    function validateEmail(value, options) {
        var opt = options || {};
        var label = opt.label || 'Email';
        if (isBlank(value)) {
            return opt.required ? { ok: false, msg: getMessage('dam.validation.required', [label]) } : { ok: true };
        }
        var ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim());
        return ok ? { ok: true } : { ok: false, msg: getMessage('dam.validation.email', [label]) };
    }

    /**
     * Validates optional or required phone input.
     * @param {*} value
     * @param {{required?: boolean, label?: string}=} options
     * @returns {{ ok: boolean, msg?: string }}
     */
    function validatePhone(value, options) {
        var opt = options || {};
        var label = opt.label || 'Phone Number';
        if (isBlank(value)) {
            return opt.required ? { ok: false, msg: getMessage('dam.validation.required', [label]) } : { ok: true };
        }
        var phone = String(value).trim();
        var digits = phone.replace(/\D/g, '');
        var ok = /^\+?[0-9][0-9\s().-]{7,20}$/.test(phone) && digits.length >= 9 && digits.length <= 15;
        return ok ? { ok: true } : { ok: false, msg: getMessage('dam.validation.phone', [label]) };
    }

    /**
     * Parses file-size input such as "512 B", "1.5 MB", or "2 GB" into bytes.
     * @param {*} value
     * @returns {?number}
     */
    function parseFileSize(value) {
        if (typeof value === 'number') { return isFinite(value) && value >= 0 ? value : null; }
        if (isBlank(value)) { return null; }
        var raw = String(value).trim();
        var m = raw.match(/^([0-9]+(?:[.,][0-9]+)?)\s*(B|KB|MB|GB|TB)?$/i);
        if (!m) { return null; }
        var numeric = Number(m[1].replace(',', '.'));
        if (isNaN(numeric) || numeric < 0) { return null; }
        var unit = (m[2] || 'B').toUpperCase();
        var scale = { B: 1, KB: 1024, MB: 1048576, GB: 1073741824, TB: 1099511627776 };
        return Math.round(numeric * (scale[unit] || 1));
    }

    /**
     * Validates file-size input.
     * @param {*} value
     * @param {{required?: boolean, min?: number, max?: number, label?: string}=} options
     * @returns {{ ok: boolean, msg?: string }}
     */
    function validateFileSize(value, options) {
        var opt = options || {};
        var label = opt.label || 'File Size';
        if (isBlank(value)) {
            return opt.required ? { ok: false, msg: getMessage('dam.validation.required', [label]) } : { ok: true };
        }
        var bytes = parseFileSize(value);
        if (bytes == null) { return { ok: false, msg: getMessage('dam.validation.fileSize') }; }
        if (opt.min != null && bytes < opt.min) {
            return { ok: false, msg: getMessage('dam.validation.numberMin', [label, opt.min]) };
        }
        if (opt.max != null && bytes > opt.max) {
            return { ok: false, msg: getMessage('dam.validation.numberMax', [label, opt.max]) };
        }
        return { ok: true };
    }

    /**
     * Validates asset metadata before save/submit.
     * @param {Object} payload
     * @param {{requireChangeLog?: boolean, changeLog?: string}=} options
     * @returns {{ ok: boolean, errors: Array<{field: string, msg: string}> }}
     */
    function validateAssetMetadata(payload, options) {
        var data = payload || {};
        var opt = options || {};
        var errors = [];
        var result = validateFileName(data.fileNm);
        if (!result.ok) { errors.push({ field: 'fileNm', msg: result.msg }); }

        result = validateStatus(data.status);
        if (!result.ok) { errors.push({ field: 'status', msg: result.msg }); }

        if (!isBlank(data.fileType) && VALID_ASSET_TYPES.indexOf(data.fileType) === -1) {
            errors.push({ field: 'fileType', msg: getMessage('dam.validation.assetType') });
        }

        result = validateTags(data.tags);
        if (!result.ok) { errors.push({ field: 'tags', msg: result.msg }); }

        result = validateMaxLength(data.description, 1000, 'Description');
        if (!result.ok) { errors.push({ field: 'description', msg: result.msg }); }

        result = validateMaxLength(data.ownerNm, 100, 'Owner');
        if (!result.ok) { errors.push({ field: 'ownerNm', msg: result.msg }); }

        result = validateFileSize(data.fileSize, { label: 'File Size' });
        if (!result.ok) { errors.push({ field: 'fileSize', msg: result.msg }); }

        if (opt.requireChangeLog && isBlank(opt.changeLog)) {
            errors.push({ field: 'changeLog', msg: getMessage('dam.asset.changeLogRequired') });
        }
        return { ok: errors.length === 0, errors: errors };
    }

    /**
     * Validates version payload before updating version data.
     * @param {Object} payload
     * @returns {{ ok: boolean, errors: Array<{field: string, msg: string}> }}
     */
    function validateVersionPayload(payload) {
        var data = payload || {};
        var errors = [];
        var result = validateRequired(data.verNo, 'Version Number');
        if (!result.ok) { errors.push({ field: 'verNo', msg: result.msg }); }

        result = validateRequired(data.ownerNm, 'Contributors');
        if (!result.ok) { errors.push({ field: 'ownerNm', msg: result.msg }); }

        result = validateRequired(data.changeLog, 'Change Notes');
        if (!result.ok) { errors.push({ field: 'changeLog', msg: result.msg }); }

        result = validateMaxLength(data.changeLog, 1000, 'Change Notes');
        if (!result.ok) { errors.push({ field: 'changeLog', msg: result.msg }); }

        return { ok: errors.length === 0, errors: errors };
    }

    function hasDocument() {
        return typeof document !== 'undefined' && document.createElement;
    }

    /**
     * Shows a common alert/confirm modal. Falls back safely outside browsers.
     * @param {{type?: string, message: string|Array, args?: Array, title?: string}=} options
     * @returns {Promise<boolean>}
     */
    function showDialog(options) {
        var opt = options || {};
        var type = opt.type === 'confirm' ? 'confirm' : 'alert';
        var message = resolveMessage(opt.message || '', opt.args || []);
        var title = opt.title || (type === 'confirm' ? getMessage('dam.common.confirm') : getMessage('dam.common.ok'));

        if (!hasDocument()) {
            return Promise.resolve(type === 'confirm' ? false : true);
        }

        if (typeof Promise === 'undefined') {
            if (type === 'confirm') { return { then: function (fn) { fn(window.confirm(message)); } }; }
            window.alert(message);
            return { then: function (fn) { fn(true); } };
        }

        return new Promise(function (resolve) {
            var backdrop = document.createElement('div');
            backdrop.className = 'dam-message-backdrop';

            var dialog = document.createElement('div');
            dialog.className = 'dam-message-dialog dam-message-' + type;
            dialog.setAttribute('role', type === 'confirm' ? 'alertdialog' : 'dialog');
            dialog.setAttribute('aria-modal', 'true');

            var head = document.createElement('div');
            head.className = 'dam-message-head';
            var titleEl = document.createElement('div');
            titleEl.className = 'dam-message-title';
            titleEl.textContent = title;
            head.appendChild(titleEl);

            var body = document.createElement('div');
            body.className = 'dam-message-body';
            body.textContent = message;

            var foot = document.createElement('div');
            foot.className = 'dam-message-foot';

            var cancelBtn = null;
            if (type === 'confirm') {
                cancelBtn = document.createElement('button');
                cancelBtn.type = 'button';
                cancelBtn.className = 'dam-message-btn dam-message-btn-cancel';
                cancelBtn.textContent = opt.cancelLabel || getMessage('dam.common.cancel');
                foot.appendChild(cancelBtn);
            }

            var okBtn = document.createElement('button');
            okBtn.type = 'button';
            okBtn.className = 'dam-message-btn dam-message-btn-ok';
            okBtn.textContent = opt.okLabel || (type === 'confirm' ? getMessage('dam.common.confirm') : getMessage('dam.common.ok'));
            foot.appendChild(okBtn);

            dialog.appendChild(head);
            dialog.appendChild(body);
            dialog.appendChild(foot);
            backdrop.appendChild(dialog);
            document.body.appendChild(backdrop);

            function close(value) {
                document.removeEventListener('keydown', onKeydown);
                if (backdrop.parentNode) { backdrop.parentNode.removeChild(backdrop); }
                resolve(value);
            }

            function onKeydown(e) {
                e = e || window.event;
                var key = e.key || e.keyCode;
                if (key === 'Escape' || key === 27) { close(false); }
                if (key === 'Enter' || key === 13) { close(true); }
            }

            okBtn.onclick = function () { close(true); };
            if (cancelBtn) { cancelBtn.onclick = function () { close(false); }; }
            backdrop.onclick = function (e) {
                if (e.target === backdrop && type !== 'confirm') { close(true); }
            };
            document.addEventListener('keydown', onKeydown);
            window.setTimeout(function () { okBtn.focus(); }, 0);
        });
    }

    /**
     * Shows a common alert modal.
     * @param {string|Array} messageOrKey
     * @param {Array=} args
     * @returns {Promise<boolean>}
     */
    function showAlert(messageOrKey, args) {
        return showDialog({ type: 'alert', message: messageOrKey, args: args });
    }

    /**
     * Shows a common confirm modal.
     * @param {string|Array} messageOrKey
     * @param {Array=} args
     * @returns {Promise<boolean>}
     */
    function showConfirm(messageOrKey, args) {
        return showDialog({ type: 'confirm', message: messageOrKey, args: args });
    }

    /**
     * Shows a non-blocking toast notification.
     * @param {string|Array} messageOrKey
     * @param {Array=} args
     * @param {string=} type
     * @returns {?Element}
     */
    function showToast(messageOrKey, args, type) {
        if (!hasDocument()) { return null; }
        var container = document.getElementById('dam_toast_container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'dam_toast_container';
            container.className = 'dam-toast-container';
            document.body.appendChild(container);
        }
        var toast = document.createElement('div');
        toast.className = 'dam-toast dam-toast-' + (type || 'info');
        toast.setAttribute('role', 'status');
        toast.textContent = resolveMessage(messageOrKey, args || []);
        container.appendChild(toast);
        window.setTimeout(function () {
            toast.className += ' is-leaving';
            window.setTimeout(function () {
                if (toast.parentNode) { toast.parentNode.removeChild(toast); }
            }, 240);
        }, 3500);
        return toast;
    }

    /**
     * Shows an inline field error under the nearest .dam-form-row.
     * @param {string} fieldId
     * @param {string} msg
     */
    function showFieldError(fieldId, msg) {
        if (!hasDocument()) { return; }
        var errorId = 'err_' + fieldId;
        var field = document.getElementById(fieldId);
        var existing = document.getElementById(errorId);
        if (field) {
            field.classList.add('is-invalid');
            field.setAttribute('aria-invalid', 'true');
        }
        if (existing) {
            existing.textContent = msg;
            existing.style.display = 'block';
            return;
        }
        if (!field) { return; }
        var row = field.closest ? field.closest('.dam-form-row') : field.parentNode;
        if (!row) { row = field.parentNode; }
        var span = document.createElement('span');
        span.id = errorId;
        span.className = 'dam-field-error';
        span.textContent = msg;
        row.appendChild(span);
    }

    /**
     * Clears one field error, or all inline field errors when fieldId is omitted.
     * @param {string=} fieldId
     */
    function clearFieldError(fieldId) {
        if (!hasDocument()) { return; }
        if (fieldId) {
            var field = document.getElementById(fieldId);
            var error = document.getElementById('err_' + fieldId);
            if (field) {
                field.classList.remove('is-invalid');
                field.removeAttribute('aria-invalid');
            }
            if (error) {
                error.style.display = 'none';
                error.textContent = '';
            }
            return;
        }
        var errors = document.querySelectorAll('.dam-field-error');
        for (var i = 0; i < errors.length; i++) {
            errors[i].style.display = 'none';
            errors[i].textContent = '';
        }
        var invalids = document.querySelectorAll('.is-invalid');
        for (var j = 0; j < invalids.length; j++) {
            invalids[j].classList.remove('is-invalid');
            invalids[j].removeAttribute('aria-invalid');
        }
    }

    /**
     * Creates a small SVG data URL icon for a file extension.
     * @param {string} ext
     * @returns {string}
     */
    function makeFileIcon(ext) {
        var color = FILE_ICON_COLORS[ext] || '#546e7a';
        var lbl = (ext || 'FILE').substring(0, 4);
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40">'
            + '<path d="M2,0 L22,0 L32,10 L32,40 L2,40 Z" fill="#ffffff" stroke="#d1d5db" stroke-width="1.5"/>'
            + '<path d="M22,0 L22,10 L32,10 Z" fill="#e5e7eb"/>'
            + '<rect x="2" y="26" width="30" height="14" fill="' + color + '"/>'
            + '<text x="16" y="37" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="#ffffff" text-anchor="middle">' + lbl + '</text>'
            + '</svg>';
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }

    return {
        formatFileSize: formatFileSize,
        buildFolderRows: buildFolderRows,
        getMessage: getMessage,
        resolveMessage: resolveMessage,
        isBlank: isBlank,
        parseNumber: parseNumber,
        parseFileSize: parseFileSize,
        validateRequired: validateRequired,
        validateMaxLength: validateMaxLength,
        validateNumber: validateNumber,
        validateEmail: validateEmail,
        validatePhone: validatePhone,
        validateFileSize: validateFileSize,
        validateFileName: validateFileName,
        validateStatus: validateStatus,
        validateTags: validateTags,
        validateAssetMetadata: validateAssetMetadata,
        validateVersionPayload: validateVersionPayload,
        showAlert: showAlert,
        alert: showAlert,
        showConfirm: showConfirm,
        confirm: showConfirm,
        showToast: showToast,
        toast: showToast,
        showFieldError: showFieldError,
        clearFieldError: clearFieldError,
        makeFileIcon: makeFileIcon,
        VALID_STATUSES: VALID_STATUSES,
        VALID_ASSET_TYPES: VALID_ASSET_TYPES,
        MESSAGES: MESSAGES
    };
}));

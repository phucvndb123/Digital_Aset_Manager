/**
 * dam-utils.test.js
 * Chạy bằng Node.js:  node dam-utils.test.js
 * Hoặc mở dam-utils.test.html trong trình duyệt.
 */

'use strict';

var DamUtils = require('./dam-utils');

/* ─── Minimal test runner ───────────────────────────────────────────── */
var _pass = 0, _fail = 0;

function describe(suiteName, fn) {
    console.log('\n  ' + suiteName);
    fn();
}

function it(label, fn) {
    try {
        fn();
        console.log('    \x1b[32m✓\x1b[0m ' + label);
        _pass++;
    } catch (e) {
        console.error('    \x1b[31m✗\x1b[0m ' + label);
        console.error('      ' + e.message);
        _fail++;
    }
}

function expect(actual) {
    return {
        toBe: function (expected) {
            if (actual !== expected) {
                throw new Error('Expected ' + JSON.stringify(expected) + ' but got ' + JSON.stringify(actual));
            }
        },
        toEqual: function (expected) {
            var a = JSON.stringify(actual), b = JSON.stringify(expected);
            if (a !== b) { throw new Error('Expected ' + b + ' but got ' + a); }
        },
        toContain: function (sub) {
            if (String(actual).indexOf(sub) === -1) {
                throw new Error('Expected "' + actual + '" to contain "' + sub + '"');
            }
        },
        toBeTruthy: function () {
            if (!actual) { throw new Error('Expected truthy but got ' + actual); }
        },
        toBeFalsy: function () {
            if (actual) { throw new Error('Expected falsy but got ' + actual); }
        }
    };
}

/* ─── formatFileSize ─────────────────────────────────────────────────── */
describe('formatFileSize', function () {
    it('returns "-" for 0', function () {
        expect(DamUtils.formatFileSize(0)).toBe('-');
    });
    it('returns "-" for null/undefined', function () {
        expect(DamUtils.formatFileSize(null)).toBe('-');
        expect(DamUtils.formatFileSize(undefined)).toBe('-');
    });
    it('formats bytes < 1024 as B', function () {
        expect(DamUtils.formatFileSize(512)).toBe('512 B');
    });
    it('formats KB correctly', function () {
        expect(DamUtils.formatFileSize(2048)).toBe('2.0 KB');
    });
    it('formats MB correctly', function () {
        expect(DamUtils.formatFileSize(5 * 1048576)).toBe('5.0 MB');
    });
    it('formats GB correctly', function () {
        expect(DamUtils.formatFileSize(2 * 1073741824)).toBe('2.0 GB');
    });
    it('accepts string input', function () {
        expect(DamUtils.formatFileSize('1048576')).toBe('1.0 MB');
    });
});

/* ─── buildFolderRows ────────────────────────────────────────────────── */
describe('buildFolderRows', function () {
    it('returns [] for empty input', function () {
        expect(DamUtils.buildFolderRows([])).toEqual([]);
        expect(DamUtils.buildFolderRows(null)).toEqual([]);
    });

    it('single root folder has DEPTH "1"', function () {
        var result = DamUtils.buildFolderRows([{ folderId: 1, folderNm: 'Root', parentFolderId: null }]);
        expect(result.length).toBe(1);
        expect(result[0].DEPTH).toBe('1');
        expect(result[0].FOLDER_NM).toBe('Root');
    });

    it('child folder has DEPTH "2"', function () {
        var folders = [
            { folderId: 1, folderNm: 'Root',  parentFolderId: null },
            { folderId: 2, folderNm: 'Child', parentFolderId: 1 }
        ];
        var result = DamUtils.buildFolderRows(folders);
        expect(result.length).toBe(2);
        expect(result[0].FOLDER_NM).toBe('Root');
        expect(result[1].FOLDER_NM).toBe('Child');
        expect(result[1].DEPTH).toBe('2');
    });

    it('preserves DFS order (parent before children)', function () {
        var folders = [
            { folderId: 3, folderNm: 'C', parentFolderId: 1 },
            { folderId: 1, folderNm: 'A', parentFolderId: null },
            { folderId: 2, folderNm: 'B', parentFolderId: 1 }
        ];
        var result = DamUtils.buildFolderRows(folders);
        expect(result[0].FOLDER_NM).toBe('A');
    });

    it('FOLDER_ID is always a string', function () {
        var result = DamUtils.buildFolderRows([{ folderId: 42, folderNm: 'X', parentFolderId: null }]);
        expect(typeof result[0].FOLDER_ID).toBe('string');
        expect(result[0].FOLDER_ID).toBe('42');
    });
});

/* ─── validateFileName ───────────────────────────────────────────────── */
describe('validateFileName', function () {
    it('fails for empty string', function () {
        expect(DamUtils.validateFileName('').ok).toBeFalsy();
        expect(DamUtils.validateFileName('   ').ok).toBeFalsy();
    });
    it('fails for null/undefined', function () {
        expect(DamUtils.validateFileName(null).ok).toBeFalsy();
        expect(DamUtils.validateFileName(undefined).ok).toBeFalsy();
    });
    it('fails when name exceeds 200 chars', function () {
        expect(DamUtils.validateFileName('a'.repeat(201)).ok).toBeFalsy();
        expect(DamUtils.validateFileName('a'.repeat(201)).msg).toContain('200');
    });
    it('passes for exactly 200 chars', function () {
        expect(DamUtils.validateFileName('a'.repeat(200)).ok).toBeTruthy();
    });
    it('fails for forbidden path characters', function () {
        ['/', '\\', ':', '*', '?', '"', '<', '>', '|'].forEach(function (ch) {
            var result = DamUtils.validateFileName('file' + ch + 'name');
            if (result.ok) { throw new Error('Should fail for char: ' + ch); }
        });
    });
    it('passes for normal file name', function () {
        expect(DamUtils.validateFileName('my-document_v2.pdf').ok).toBeTruthy();
    });
    it('passes for Vietnamese characters', function () {
        expect(DamUtils.validateFileName('tài liệu quan trọng.docx').ok).toBeTruthy();
    });
});

/* ─── validateStatus ─────────────────────────────────────────────────── */
describe('validateStatus', function () {
    it('fails for empty string', function () {
        expect(DamUtils.validateStatus('').ok).toBeFalsy();
        expect(DamUtils.validateStatus(null).ok).toBeFalsy();
    });
    it('passes for each valid status', function () {
        DamUtils.VALID_STATUSES.forEach(function (s) {
            if (!DamUtils.validateStatus(s).ok) { throw new Error('Should pass for: ' + s); }
        });
    });
    it('fails for unknown status', function () {
        expect(DamUtils.validateStatus('Active').ok).toBeFalsy();
        expect(DamUtils.validateStatus('DRAFT').ok).toBeFalsy();   // case-sensitive
    });
});

/* ─── validateTags ───────────────────────────────────────────────────── */
describe('validateTags', function () {
    it('passes for empty/null (tags are optional)', function () {
        expect(DamUtils.validateTags('').ok).toBeTruthy();
        expect(DamUtils.validateTags(null).ok).toBeTruthy();
        expect(DamUtils.validateTags('   ').ok).toBeTruthy();
    });
    it('passes for 10 tags', function () {
        var tags = ['A','B','C','D','E','F','G','H','I','J'].join(',');
        expect(DamUtils.validateTags(tags).ok).toBeTruthy();
    });
    it('fails for 11 tags', function () {
        var tags = ['A','B','C','D','E','F','G','H','I','J','K'].join(',');
        expect(DamUtils.validateTags(tags).ok).toBeFalsy();
        expect(DamUtils.validateTags(tags).msg).toContain('10');
    });
    it('fails when any tag exceeds 50 chars', function () {
        var tags = 'Normal,' + 'x'.repeat(51);
        expect(DamUtils.validateTags(tags).ok).toBeFalsy();
        expect(DamUtils.validateTags(tags).msg).toContain('50');
    });
    it('passes for single valid tag', function () {
        expect(DamUtils.validateTags('Marketing').ok).toBeTruthy();
    });
    it('trims whitespace around tags before counting', function () {
        var tags = ' A , B , C ';
        expect(DamUtils.validateTags(tags).ok).toBeTruthy();
    });
});

/* ─── makeFileIcon ───────────────────────────────────────────────────── */
describe('makeFileIcon', function () {
    it('returns a data URL starting with data:image/svg+xml', function () {
        expect(DamUtils.makeFileIcon('PDF')).toContain('data:image/svg+xml');
    });
    it('encodes the extension label in the SVG', function () {
        var url = decodeURIComponent(DamUtils.makeFileIcon('PDF').split(',')[1]);
        expect(url).toContain('PDF');
    });
    it('truncates extension to 4 chars', function () {
        var url = decodeURIComponent(DamUtils.makeFileIcon('DOCXX').split(',')[1]);
        expect(url).toContain('DOCX');
    });
    it('uses fallback color for unknown extension', function () {
        var url = decodeURIComponent(DamUtils.makeFileIcon('XYZ').split(',')[1]);
        expect(url).toContain('#546e7a');
    });
    it('uses correct color for PDF (red)', function () {
        var url = decodeURIComponent(DamUtils.makeFileIcon('PDF').split(',')[1]);
        expect(url).toContain('#f44336');
    });
    it('uses correct color for MP3 (indigo)', function () {
        var url = decodeURIComponent(DamUtils.makeFileIcon('MP3').split(',')[1]);
        expect(url).toContain('#3949ab');
    });
});

/* ─── Summary ────────────────────────────────────────────────────────── */
console.log('\n' + '─'.repeat(40));
console.log('  Tests: ' + (_pass + _fail) + '  |  Pass: \x1b[32m' + _pass + '\x1b[0m  |  Fail: \x1b[31m' + _fail + '\x1b[0m');
console.log('─'.repeat(40));
if (_fail > 0) { process.exit(1); }

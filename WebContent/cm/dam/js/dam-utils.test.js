/**
 * dam-utils.test.js
 * Run with Node.js:
 *   node WebContent\cm\dam\js\dam-utils.test.js
 */

'use strict';

var DamUtils = require('./dam-utils');

var _pass = 0;
var _fail = 0;

function describe(suiteName, fn) {
    console.log('\n  ' + suiteName);
    fn();
}

function it(label, fn) {
    try {
        fn();
        console.log('    PASS ' + label);
        _pass++;
    } catch (e) {
        console.error('    FAIL ' + label);
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
            var a = JSON.stringify(actual);
            var b = JSON.stringify(expected);
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

describe('formatFileSize', function () {
    it('returns "-" for 0', function () {
        expect(DamUtils.formatFileSize(0)).toBe('-');
    });
    it('returns "-" for null/undefined', function () {
        expect(DamUtils.formatFileSize(null)).toBe('-');
        expect(DamUtils.formatFileSize(undefined)).toBe('-');
    });
    it('formats bytes under 1024 as B', function () {
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
            { folderId: 1, folderNm: 'Root', parentFolderId: null },
            { folderId: 2, folderNm: 'Child', parentFolderId: 1 }
        ];
        var result = DamUtils.buildFolderRows(folders);
        expect(result.length).toBe(2);
        expect(result[0].FOLDER_NM).toBe('Root');
        expect(result[1].FOLDER_NM).toBe('Child');
        expect(result[1].DEPTH).toBe('2');
    });
    it('preserves DFS order with parent before children', function () {
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

describe('common messages', function () {
    it('resolves message keys with placeholders', function () {
        var message = DamUtils.getMessage('dam.asset.submitSuccess', ['v1.2']);
        expect(message).toContain('v1.2');
        expect(message).toContain('Submitted successfully');
    });
    it('uses English validation messages', function () {
        expect(DamUtils.getMessage('dam.validation.required', ['File Name'])).toBe('Please enter File Name.');
        expect(DamUtils.getMessage('dam.confirm.saveChanges')).toBe('Are you sure you want to save these changes?');
    });
    it('formats raw messages with placeholders', function () {
        expect(DamUtils.resolveMessage('Hello {0}', ['DAM'])).toBe('Hello DAM');
    });
});

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
    it('passes for user-friendly file names', function () {
        expect(DamUtils.validateFileName('tai-lieu-quan-trong.docx').ok).toBeTruthy();
    });
});

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
        expect(DamUtils.validateStatus('DRAFT').ok).toBeFalsy();
    });
});

describe('validateTags', function () {
    it('passes for empty/null because tags are optional', function () {
        expect(DamUtils.validateTags('').ok).toBeTruthy();
        expect(DamUtils.validateTags(null).ok).toBeTruthy();
        expect(DamUtils.validateTags('   ').ok).toBeTruthy();
    });
    it('passes for 10 tags', function () {
        var tags = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].join(',');
        expect(DamUtils.validateTags(tags).ok).toBeTruthy();
    });
    it('fails for 11 tags', function () {
        var tags = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].join(',');
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

describe('validateNumber', function () {
    it('passes integer and decimal input', function () {
        expect(DamUtils.validateNumber('1,234.5', { label: 'Amount' }).ok).toBeTruthy();
        expect(DamUtils.parseNumber('1,234.5')).toBe(1234.5);
    });
    it('fails non-numeric input', function () {
        expect(DamUtils.validateNumber('12MB', { label: 'Amount' }).ok).toBeFalsy();
    });
    it('enforces min and max', function () {
        expect(DamUtils.validateNumber('5', { min: 6, label: 'Amount' }).ok).toBeFalsy();
        expect(DamUtils.validateNumber('10', { max: 9, label: 'Amount' }).ok).toBeFalsy();
    });
});

describe('validateEmail', function () {
    it('passes valid email input', function () {
        expect(DamUtils.validateEmail('user@example.com').ok).toBeTruthy();
    });
    it('fails invalid email input', function () {
        expect(DamUtils.validateEmail('user@example').ok).toBeFalsy();
    });
});

describe('validatePhone', function () {
    it('passes local and international phone input', function () {
        expect(DamUtils.validatePhone('0912 345 678').ok).toBeTruthy();
        expect(DamUtils.validatePhone('+84 912 345 678').ok).toBeTruthy();
    });
    it('fails invalid phone input', function () {
        expect(DamUtils.validatePhone('abc-123').ok).toBeFalsy();
    });
});

describe('parseFileSize and validateFileSize', function () {
    it('parses formatted file size text to bytes', function () {
        expect(DamUtils.parseFileSize('1.5 KB')).toBe(1536);
        expect(DamUtils.parseFileSize('2 MB')).toBe(2097152);
    });
    it('fails invalid file size text', function () {
        expect(DamUtils.validateFileSize('size-large').ok).toBeFalsy();
    });
});

describe('validateAssetMetadata', function () {
    it('passes a valid asset payload', function () {
        var result = DamUtils.validateAssetMetadata({
            fileNm: 'campaign.pdf',
            fileType: 'Documents',
            tags: 'Marketing,Campaign',
            status: 'Draft',
            fileSize: '2 MB',
            ownerNm: 'Admin'
        }, { requireChangeLog: true, changeLog: 'Initial upload' });
        expect(result.ok).toBeTruthy();
    });
    it('collects field-level errors', function () {
        var result = DamUtils.validateAssetMetadata({
            fileNm: '',
            fileType: 'Unknown',
            tags: 'A,B,C,D,E,F,G,H,I,J,K',
            status: 'Bad',
            fileSize: 'large'
        }, { requireChangeLog: true, changeLog: '' });
        expect(result.ok).toBeFalsy();
        expect(result.errors.length > 1).toBeTruthy();
    });
});

describe('validateVersionPayload', function () {
    it('requires version number, contributors, and change notes', function () {
        var result = DamUtils.validateVersionPayload({ verNo: '', ownerNm: '', changeLog: '' });
        expect(result.ok).toBeFalsy();
        expect(result.errors.length).toBe(3);
    });
});

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
    it('uses correct color for PDF red', function () {
        var url = decodeURIComponent(DamUtils.makeFileIcon('PDF').split(',')[1]);
        expect(url).toContain('#f44336');
    });
    it('uses correct color for MP3 indigo', function () {
        var url = decodeURIComponent(DamUtils.makeFileIcon('MP3').split(',')[1]);
        expect(url).toContain('#3949ab');
    });
});

console.log('\n' + '-'.repeat(40));
console.log('  Tests: ' + (_pass + _fail) + '  |  Pass: ' + _pass + '  |  Fail: ' + _fail);
console.log('-'.repeat(40));
if (_fail > 0) { process.exit(1); }

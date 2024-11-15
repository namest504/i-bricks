"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputValidatorService = void 0;
var InputValidatorService = /** @class */ (function () {
    function InputValidatorService() {
        this.MAX_CONTENT_LENGTH = 1024;
    }
    InputValidatorService.prototype.validateInput = function (input) {
        var _this = this;
        var validLines = input.split('\n').filter(function (line) {
            var _a = line.trim().split(/\s+/), docId = _a[0], content = _a.slice(1);
            var contentString = content.join(' ');
            if (!_this.isValidDocId(docId)) {
                console.warn("Invalid document ID: ".concat(docId));
                return false;
            }
            if (!_this.isValidContent(contentString)) {
                console.warn("Invalid content for document ".concat(docId, ": Content exceeds ").concat(_this.MAX_CONTENT_LENGTH, " bytes or contains invalid characters"));
                return false;
            }
            return true;
        });
        return validLines.join('\n');
    };
    InputValidatorService.prototype.isValidDocId = function (docId) {
        return /^\d+$/.test(docId);
    };
    InputValidatorService.prototype.isValidContent = function (content) {
        var contentBytes = Buffer.from(content);
        if (contentBytes.length > this.MAX_CONTENT_LENGTH) {
            return false;
        }
        // ASCII 범위 검사 (32-126)
        return contentBytes.every(function (byte) { return byte >= 32 && byte <= 126; });
    };
    return InputValidatorService;
}());
exports.InputValidatorService = InputValidatorService;

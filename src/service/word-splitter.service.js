"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordSplitterService = void 0;
var WordSplitterService = /** @class */ (function () {
    function WordSplitterService() {
    }
    WordSplitterService.prototype.splitWords = function (text) {
        var cleanedText = text.replace(/[^a-zA-Z0-9]/g, ' ');
        var normalizedText = cleanedText.replace(/\s+/g, ' ');
        var words = normalizedText.trim().split(' ');
        return words.filter(function (word) { return word.length > 0; }).map(function (word) { return word.toLowerCase(); });
    };
    return WordSplitterService;
}());
exports.WordSplitterService = WordSplitterService;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvertedFileCreatorService = void 0;
var InvertedFileCreatorService = /** @class */ (function () {
    function InvertedFileCreatorService(wordSplitter) {
        this.wordSplitter = wordSplitter;
        this.invertedFile = new Map();
    }
    InvertedFileCreatorService.prototype.createInvertedFile = function (inputData) {
        var _this = this;
        var lines = inputData.split('\n');
        lines.forEach(function (line) {
            var _a = line.trim().split(/\s+/), docId = _a[0], textParts = _a.slice(1);
            var documentId = parseInt(docId);
            var text = textParts.join(' ');
            var words = _this.wordSplitter.splitWords(text);
            words.forEach(function (word) {
                if (!_this.invertedFile.has(word)) {
                    _this.invertedFile.set(word, new Map());
                }
                var docMap = _this.invertedFile.get(word);
                docMap.set(documentId, (docMap.get(documentId) || 0) + 1);
            });
        });
    };
    InvertedFileCreatorService.prototype.getInvertedFile = function () {
        return this.invertedFile;
    };
    return InvertedFileCreatorService;
}());
exports.InvertedFileCreatorService = InvertedFileCreatorService;

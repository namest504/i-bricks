"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File_processor = void 0;
var fs = require("fs");
var File_processor = /** @class */ (function () {
    function File_processor(inputFile, outputFile) {
        this.inputFile = inputFile;
        this.outputFile = outputFile;
        this.invertedFile = new Map();
    }
    File_processor.prototype.splitWords = function (text) {
        var cleanedText = text.replace(/[^a-zA-Z0-9]/g, ' ');
        var normalizedText = cleanedText.replace(/\s+/g, ' ');
        var words = normalizedText.trim().split(' ');
        return words.filter(function (word) { return word.length > 0; }).map(function (word) { return word.toLowerCase(); });
    };
    File_processor.prototype.createInvertedFile = function (inputData) {
        var _this = this;
        var lines = inputData.split('\n');
        lines.forEach(function (line) {
            var _a = line.trim().split(/\s+/), docId = _a[0], textParts = _a.slice(1);
            var documentId = parseInt(docId);
            var text = textParts.join(' ');
            var words = _this.splitWords(text);
            words.forEach(function (word) {
                if (!_this.invertedFile.has(word)) {
                    _this.invertedFile.set(word, new Map());
                }
                var docMap = _this.invertedFile.get(word);
                docMap.set(documentId, (docMap.get(documentId) || 0) + 1);
            });
        });
    };
    File_processor.prototype.formatResult = function () {
        var _this = this;
        var sortedWords = Array.from(this.invertedFile.keys()).sort();
        return sortedWords.map(function (word) {
            var docMap = _this.invertedFile.get(word);
            var sortedDocs = Array.from(docMap.entries())
                .sort(function (a, b) { return b[1] - a[1] || a[0] - b[0]; })
                .map(function (_a) {
                var docId = _a[0], freq = _a[1];
                return "".concat(docId, " ").concat(freq);
            })
                .join(' ');
            return "".concat(word, " ").concat(sortedDocs);
        }).join('\n');
    };
    File_processor.prototype.generate = function () {
        try {
            var inputData = fs.readFileSync(this.inputFile, 'utf-8');
            this.createInvertedFile(inputData);
            var result = this.formatResult();
            fs.writeFileSync(this.outputFile, result);
            console.log("역파일 생성 완료");
        }
        catch (error) {
            console.error('오류 발생:', error);
        }
    };
    return File_processor;
}());
exports.File_processor = File_processor;

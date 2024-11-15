"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultFormatterService = void 0;
var ResultFormatterService = /** @class */ (function () {
    function ResultFormatterService() {
    }
    ResultFormatterService.prototype.formatResult = function (invertedFile) {
        var sortedWords = Array.from(invertedFile.keys()).sort();
        return sortedWords.map(function (word) {
            var docMap = invertedFile.get(word);
            var sortedDocs = Array.from(docMap.entries())
                .sort(function (entryA, entryB) {
                var docIdA = entryA[0], freqA = entryA[1];
                var docIdB = entryB[0], freqB = entryB[1];
                return freqB - freqA || docIdA - docIdB;
            })
                .map(function (_a) {
                var docId = _a[0], freq = _a[1];
                return "".concat(docId, " ").concat(freq);
            })
                .join(' ');
            return "".concat(word, " ").concat(sortedDocs);
        }).join('\n');
    };
    return ResultFormatterService;
}());
exports.ResultFormatterService = ResultFormatterService;

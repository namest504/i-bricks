"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileProcessorService = void 0;
var FileProcessorService = /** @class */ (function () {
    function FileProcessorService(invertedFileCreator, resultFormatter) {
        this.invertedFileCreator = invertedFileCreator;
        this.resultFormatter = resultFormatter;
    }
    FileProcessorService.prototype.processFile = function (inputData) {
        this.invertedFileCreator.createInvertedFile(inputData);
        var invertedFile = this.invertedFileCreator.getInvertedFile();
        return this.resultFormatter.formatResult(invertedFile);
    };
    return FileProcessorService;
}());
exports.FileProcessorService = FileProcessorService;

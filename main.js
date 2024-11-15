"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var file_io_service_1 = require("./src/io/file-io.service");
var file_processor_service_1 = require("./src/service/file-processor.service");
var result_formatter_service_1 = require("./src/service/result-formatter.service");
var inverted_file_creator_service_1 = require("./src/service/inverted-file-creator.service");
var word_splitter_service_1 = require("./src/service/word-splitter.service");
var input_validator_service_1 = require("./src/service/input-validator.service");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var args, inputFile, outputFile, inputData, inputValidator, validatedInput, wordSplitter, invertedFileCreator, resultFormatter, fileProcessor, result;
        return __generator(this, function (_a) {
            args = process.argv.slice(2);
            if (args.length !== 2) {
                console.error('Usage: node main.js <input file> <output file>');
                process.exit(1);
            }
            inputFile = args[0], outputFile = args[1];
            try {
                inputData = file_io_service_1.FileIoService.readInputFile(inputFile);
                inputValidator = new input_validator_service_1.InputValidatorService();
                validatedInput = inputValidator.validateInput(inputData);
                wordSplitter = new word_splitter_service_1.WordSplitterService();
                invertedFileCreator = new inverted_file_creator_service_1.InvertedFileCreatorService(wordSplitter);
                resultFormatter = new result_formatter_service_1.ResultFormatterService();
                fileProcessor = new file_processor_service_1.FileProcessorService(invertedFileCreator, resultFormatter);
                result = fileProcessor.processFile(validatedInput);
                file_io_service_1.FileIoService.writeOutputFile(outputFile, result);
            }
            catch (error) {
                console.error('처리 중 오류 발생:', error);
            }
            return [2 /*return*/];
        });
    });
}
if (require.main === module) {
    main().catch(function (error) {
        console.error('Unhandled error:', error);
        process.exit(1);
    });
}

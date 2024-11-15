"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileIoService = void 0;
var fs = require("fs");
var FileIoService = /** @class */ (function () {
    function FileIoService() {
    }
    FileIoService.readInputFile = function (filePath) {
        try {
            return fs.readFileSync(filePath, 'utf-8');
        }
        catch (error) {
            console.error('입력 파일 읽기 오류:', error);
            throw error;
        }
    };
    FileIoService.writeOutputFile = function (filePath, data) {
        try {
            fs.writeFileSync(filePath, data);
            console.log("역파일 생성 완료");
        }
        catch (error) {
            console.error('출력 파일 쓰기 오류:', error);
            throw error;
        }
    };
    return FileIoService;
}());
exports.FileIoService = FileIoService;

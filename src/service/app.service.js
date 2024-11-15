"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const file_processor_service_1 = require("./file-processor.service");
class AppService {
    static run() {
        const args = process.argv.slice(2);
        if (args.length !== 2) {
            console.error('Usage: node main.js <input file> <output file>');
            process.exit(1);
        }
        const [inputFile, outputFile] = args;
        const generator = new file_processor_service_1.FileProcessorService(inputFile, outputFile);
        generator.generate();
    }
}
exports.AppService = AppService;

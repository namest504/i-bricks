"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileProcessorService = void 0;
const fs = __importStar(require("fs"));
class FileProcessorService {
    constructor(inputFile, outputFile) {
        this.inputFile = inputFile;
        this.outputFile = outputFile;
        this.invertedFile = new Map();
    }
    splitWords(text) {
        const cleanedText = text.replace(/[^a-zA-Z0-9]/g, ' ');
        const normalizedText = cleanedText.replace(/\s+/g, ' ');
        const words = normalizedText.trim().split(' ');
        return words.filter(word => word.length > 0).map(word => word.toLowerCase());
    }
    createInvertedFile(inputData) {
        const lines = inputData.split('\n');
        lines.forEach(line => {
            const [docId, ...textParts] = line.trim().split(/\s+/);
            const documentId = parseInt(docId);
            const text = textParts.join(' ');
            const words = this.splitWords(text);
            words.forEach(word => {
                if (!this.invertedFile.has(word)) {
                    this.invertedFile.set(word, new Map());
                }
                const docMap = this.invertedFile.get(word);
                docMap.set(documentId, (docMap.get(documentId) || 0) + 1);
            });
        });
    }
    formatResult() {
        const sortedWords = Array.from(this.invertedFile.keys()).sort();
        return sortedWords.map(word => {
            const docMap = this.invertedFile.get(word);
            const sortedDocs = Array.from(docMap.entries())
                .sort((entryA, entryB) => {
                const [docIdA, freqA] = entryA;
                const [docIdB, freqB] = entryB;
                return freqB - freqA || docIdA - docIdB;
            })
                .map(([docId, freq]) => `${docId} ${freq}`)
                .join(' ');
            return `${word} ${sortedDocs}`;
        }).join('\n');
    }
    generate() {
        try {
            const inputData = fs.readFileSync(this.inputFile, 'utf-8');
            this.createInvertedFile(inputData);
            const result = this.formatResult();
            fs.writeFileSync(this.outputFile, result);
            console.log("역파일 생성 완료");
        }
        catch (error) {
            console.error('오류 발생:', error);
        }
    }
}
exports.FileProcessorService = FileProcessorService;

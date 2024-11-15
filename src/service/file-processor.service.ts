import * as fs from 'fs';

export class FileProcessorService {
    private inputFile: string;
    private outputFile: string;
    private invertedFile: Map<string, Map<number, number>>;

    constructor(inputFile: string, outputFile: string) {
        this.inputFile = inputFile;
        this.outputFile = outputFile;
        this.invertedFile = new Map<string, Map<number, number>>();
    }

    private splitWords(text: string): string[] {
        const cleanedText = text.replace(/[^a-zA-Z0-9]/g, ' ');
        const normalizedText = cleanedText.replace(/\s+/g, ' ');
        const words = normalizedText.trim().split(' ');
        return words.filter(word => word.length > 0).map(word => word.toLowerCase());
    }

    private createInvertedFile(inputData: string): void {
        const lines = inputData.split('\n');

        lines.forEach(line => {
            const [docId, ...textParts] = line.trim().split(/\s+/);
            const documentId = parseInt(docId);
            const text = textParts.join(' ');

            const words = this.splitWords(text);

            words.forEach(word => {
                if (!this.invertedFile.has(word)) {
                    this.invertedFile.set(word, new Map<number, number>());
                }
                const docMap = this.invertedFile.get(word)!;
                docMap.set(documentId, (docMap.get(documentId) || 0) + 1);
            });
        });
    }

    private formatResult(): string {
        const sortedWords = Array.from(this.invertedFile.keys()).sort();

        return sortedWords.map(word => {
            const docMap = this.invertedFile.get(word)!;
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

    public generate(): void {
        try {
            const inputData = fs.readFileSync(this.inputFile, 'utf-8');
            this.createInvertedFile(inputData);
            const result = this.formatResult();
            fs.writeFileSync(this.outputFile, result);
            console.log("역파일 생성 완료");
        } catch (error) {
            console.error('오류 발생:', error);
        }
    }
}
import { WordSplitterService } from './word-splitter.service';

export class InvertedFileCreatorService {
    private invertedFile: Map<string, Map<number, number>>;

    constructor(private wordSplitter: WordSplitterService) {
        this.invertedFile = new Map<string, Map<number, number>>();
    }

    public createInvertedFile(inputData: string): void {
        const lines = inputData.split('\n');

        lines.forEach(line => {
            const [docId, ...textParts] = line.trim().split(/\s+/);
            const documentId = parseInt(docId);
            const text = textParts.join(' ');

            const words = this.wordSplitter.splitWords(text);

            words.forEach(word => {
                if (!this.invertedFile.has(word)) {
                    this.invertedFile.set(word, new Map<number, number>());
                }
                const docMap = this.invertedFile.get(word)!;
                docMap.set(documentId, (docMap.get(documentId) || 0) + 1);
            });
        });
    }

    public getInvertedFile(): Map<string, Map<number, number>> {
        return this.invertedFile;
    }
}
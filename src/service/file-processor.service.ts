import { WordSplitterService } from './word-splitter.service';
import { InvertedFileCreatorService } from './inverted-file-creator.service';
import { ResultFormatterService } from './result-formatter.service';

export class FileProcessorService {
    constructor(
        private invertedFileCreator: InvertedFileCreatorService,
        private resultFormatter: ResultFormatterService
    ) {}

    public processFile(inputData: string): string {
        this.invertedFileCreator.createInvertedFile(inputData);
        const invertedFile = this.invertedFileCreator.getInvertedFile();
        return this.resultFormatter.formatResult(invertedFile);
    }
}
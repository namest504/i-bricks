import { FileProcessorService } from './src/service/file-processor.service';
import { FileIoService } from "./src/io/file-io.service";
import { WordSplitterService } from './src/service/word-splitter.service';
import { InvertedFileCreatorService } from './src/service/inverted-file-creator.service';
import { ResultFormatterService } from './src/service/result-formatter.service';

async function main(): Promise<void> {
    const args = process.argv.slice(2);

    if (args.length !== 2) {
        console.error('Usage: node main.js <input file> <output file>');
        process.exit(1);
    }

    const [inputFile, outputFile] = args;

    try {
        const inputData = FileIoService.readInputFile(inputFile);

        const wordSplitter = new WordSplitterService();
        const invertedFileCreator = new InvertedFileCreatorService(wordSplitter);
        const resultFormatter = new ResultFormatterService();
        const fileProcessor = new FileProcessorService(invertedFileCreator, resultFormatter);

        const result = fileProcessor.processFile(inputData);
        FileIoService.writeOutputFile(outputFile, result);
        console.log("역파일 생성 완료");
    } catch (error) {
        console.error('처리 중 오류 발생:', error);
    }
}

if (require.main === module) {
    main().catch(error => {
        console.error('Unhandled error:', error);
        process.exit(1);
    });
}
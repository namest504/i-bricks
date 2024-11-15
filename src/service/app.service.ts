import { FileProcessorService } from './file-processor.service';

export class AppService {
    static run(): void {
        const args = process.argv.slice(2);

        if (args.length !== 2) {
            console.error('Usage: node main.js <input file> <output file>');
            process.exit(1);
        }

        const [inputFile, outputFile] = args;
        const generator = new FileProcessorService(inputFile, outputFile);
        generator.generate();
    }
}
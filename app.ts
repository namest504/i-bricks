import { File_processor } from './file_processor';

export class App {
    static run(): void {
        const args = process.argv.slice(2);

        if (args.length !== 2) {
            console.error('Usage: node main.js <input file> <output file>');
            process.exit(1);
        }

        const [inputFile, outputFile] = args;
        const generator = new File_processor(inputFile, outputFile);
        generator.generate();
    }
}
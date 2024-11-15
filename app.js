"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var file_processor_1 = require("./file_processor");
var App = /** @class */ (function () {
    function App() {
    }
    App.run = function () {
        var args = process.argv.slice(2);
        if (args.length !== 2) {
            console.error('Usage: node main.js <input file> <output file>');
            process.exit(1);
        }
        var inputFile = args[0], outputFile = args[1];
        var generator = new file_processor_1.File_processor(inputFile, outputFile);
        generator.generate();
    };
    return App;
}());
exports.App = App;

export class ResultFormatterService {
    public formatResult(invertedFile: Map<string, Map<number, number>>): string {
        const sortedWords = Array.from(invertedFile.keys()).sort();

        return sortedWords.map(word => {
            const docMap = invertedFile.get(word)!;
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
}
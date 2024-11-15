export class WordSplitterService {
    public splitWords(text: string): string[] {
        const cleanedText = text.replace(/[^a-zA-Z0-9]/g, ' ');
        const normalizedText = cleanedText.replace(/\s+/g, ' ');
        const words = normalizedText.trim().split(' ');
        return words.filter(word => word.length > 0).map(word => word.toLowerCase());
    }
}
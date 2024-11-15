export class InputValidatorService {
    private readonly MAX_CONTENT_LENGTH = 1024;

    public validateInput(input: string): string {
        const validLines = input.split('\n').filter(line => {
            const [docId, ...content] = line.trim().split(/\s+/);
            const contentString = content.join(' ');

            if (!this.isValidDocId(docId)) {
                console.warn(`Invalid document ID: ${docId}`);
                return false;
            }

            if (!this.isValidContent(contentString)) {
                console.warn(`Invalid content for document ${docId}: Content exceeds ${this.MAX_CONTENT_LENGTH} bytes or contains invalid characters`);
                return false;
            }

            return true;
        });

        return validLines.join('\n');
    }

    private isValidDocId(docId: string): boolean {
        return /^\d+$/.test(docId);
    }

    private isValidContent(content: string): boolean {
        const contentBytes = Buffer.from(content);
        if (contentBytes.length > this.MAX_CONTENT_LENGTH) {
            return false;
        }

        // ASCII 범위 검사 (32-126)
        return contentBytes.every(byte => byte >= 32 && byte <= 126);
    }
}
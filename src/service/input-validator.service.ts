export class InputValidatorService {
    private readonly MAX_CONTENT_LENGTH = 1024;

    public validateInput(input: string): string {
        const validLines = input.split('\n').filter(line => {
            const [docId, ...content] = line.trim().split(/\s+/);
            const contentString = content.join(' ');

            if (!this.isValidDocId(docId)) {
                console.warn(`유효하지 않은 문서 ID: ${docId}`);
                return false;
            }

            if (!this.isValidContent(contentString)) {
                console.warn(`문서 ${docId}의 내용이 유효하지 않음: 내용이 ${this.MAX_CONTENT_LENGTH} 바이트를 초과하거나 유효하지 않은 문자를 포함하고 있습니다`);
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
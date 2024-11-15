import * as fs from 'fs';

export class FileIoService {
    static readInputFile(filePath: string): string {
        try {
            return fs.readFileSync(filePath, 'utf-8');
        } catch (error) {
            console.error('입력 파일 읽기 오류:', error);
            throw error;
        }
    }

    static writeOutputFile(filePath: string, data: string): void {
        try {
            fs.writeFileSync(filePath, data);
            console.log("역파일 생성 완료");
        } catch (error) {
            console.error('출력 파일 쓰기 오류:', error);
            throw error;
        }
    }
}
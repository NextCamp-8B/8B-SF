/**
 * 현재 타임스탬프 접두사로 파일 이름을 생성
 *
 * @param fileName - 원래 파일 이름
 * @returns 현재 타임스탬프와 정리된 문자를 포함한 새로운 파일 이름
 */
export default function generateFileName(fileName: string): string {
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(
    /[^A-Za-z0-9_.\-]/g,
    '_',
  );
  return `${timestamp}_${sanitizedFileName}`;
}

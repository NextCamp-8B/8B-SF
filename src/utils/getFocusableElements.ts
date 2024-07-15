/**
 * 주어진 요소 내의 모든 포커스 가능한 요소들을 반환
 *
 * @param element - 포커스 가능한 요소들을 찾을 기준 요소
 * @returns 포커스 가능한 요소들의 배열
 */
export function getFocusableElements(
  element: HTMLElement,
): HTMLElement[] {
  try {
    const isElCanBeFocused = element.querySelectorAll(
      `a[href], button, textarea, input[type="text"], 
      input[type="radio"], input[type="checkbox"], 
      select, [tabindex]:not([tabindex="-1"])`,
    );

    return Array.from(isElCanBeFocused) as HTMLElement[];
  } catch (e) {
    console.error(`No element to focus was found.: ${e}`);
  }

  return [];
}

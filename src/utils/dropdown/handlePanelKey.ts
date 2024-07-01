/**
 * @function handlePanelKey
 * @description 
 * - Enter 키 입력에 따라 드롭다운 패널의 열림/닫힘 상태를 설정하는 함수
 *
 * @param e - 키보드 이벤트 객체
 * @param onClick - 드롭다운 패널의 Open 상태를 설정하는 함수
 *
 *
 * @example
    <ul onKeyDown={(e) => handlePanelKey(e, setIsOpen)}>
      {children()}
    </ul>
 */
export function handlePanelKey(
  e: React.KeyboardEvent<HTMLUListElement>,
  onClick: (isEnter: boolean) => void,
) {
  const isEnter = e.key === 'Enter';
  onClick(isEnter);
}

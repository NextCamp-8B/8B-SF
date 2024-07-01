/**
 * @function handleDropdownStatus
 * @description
 * - 드롭다운 상태를 처리하는 함수
 * - 마우스 클릭 또는 키보드 이벤트를 통해 호출
 *
 * @param e - 이벤트 객체, 마우스 클릭 또는 키보드 이벤트
 * @param onClick - 클릭 이벤트 발생 시 호출되는 함수, 인자는 선택된 target의 dataset.value 인자
 * @param handleOptionsKey - 키보드 이벤트 발생 시 호출, 선택된 target의 이벤트 객체와 dataset.value 인자
 *
 * @example
    <ul 
      onClick={(e) => handleDropdownStatus(e, onClickHandler, onKeyHandler)} 
      onKeyDown={(e) => handleDropdownStatus(e, onClickHandler, onKeyHandler)}
    >
      {children()}
    </ul>
 */
export function handleDropdownStatus(
  e:
    | React.MouseEvent<HTMLUListElement, MouseEvent>
    | React.KeyboardEvent<HTMLUListElement>,
  onClick: (value: string) => void,
  handleOptionsKey: (
    e: React.KeyboardEvent<HTMLUListElement>,
    datasetValue: string,
  ) => void,
) {
  const target = e.target as HTMLUListElement;
  const value = target.dataset.value as string;

  if (e.type === 'click') {
    onClick(value);
  } else if (e.type === 'keydown') {
    handleOptionsKey(
      e as React.KeyboardEvent<HTMLUListElement>,
      value,
    );
  }
}

import DropdownLabel from './DropdownLabel';
import DropDownOption from './DropdownOption';
import DropDownPanel from './DropdownPanel';
import DropdownSelect from './DropdownSelect';
import DropdownWrapper from './DropdownWrapper';

/**
 * Dropdown은 분리된 컴포넌트를 사용처에서 조합해 사용합니다.
 * 개발 진행 상황에 따라 사용 예시 및 설명이 변경도리 수 있습니다.
 *
 * @property {Component} Label - 무엇에 관한 Dropdwon 인지 표시
 * @property {Component} Select - Dropdwon Panel을 여는 트리거 역할
 * @property {Component} Panel - Option 목록을 포함한 인터페이스 요소
 * @property {Component} Option - Dropdown 메뉴에서 사용자가 선택할 수 있는 개별 항목
 *
 * @example
      <Dropdown>
        <Dropdown.Label>회원탈퇴 사유</Dropdown.Label>
        <Dropdown.Select onChange={handleChange}>
          {selected}
        </Dropdown.Select>
        <Dropdown.Panel onChange={handleOptionChange}>
          <Dropdown.Option value={'사유1'}>
            첫 번째 사유
          </Dropdown.Option>
          <Dropdown.Option value={'사유2'}>
            두 번째 사유
          </Dropdown.Option>
        </Dropdown.Panel>
      </Dropdown>
 */
export const Dropdown = Object.assign(DropdownWrapper, {
  Label: DropdownLabel,
  Select: DropdownSelect,
  Panel: DropDownPanel,
  Option: DropDownOption,
});
export default Dropdown;

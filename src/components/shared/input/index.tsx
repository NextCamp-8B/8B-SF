import InputCore from './InputCore';
import InputDuplicateCheck from './InputDuplicateCheck';
import InputLabel from './InputLabel';
import InputMain from './InputMain';
import InputValidatedText from './InputValidatedText';

/**
 * InputArea 는 분리된 컴포넌트를 사용처에서 조합해 사용합니다.
 *
 * @property {Component} DuplicateCheck
 *  - 아이디 및 닉네임을 입력하는 input 컴포넌트입니다. 중복 체크 버튼이 추가적으로 포함됩니다.
 * @property {Component} Input - input 태그가 사용되는 핵심 컴포넌트 입니다.
 * @property {Component} Label - 무엇에 대한 input 태그인지 설명합니다.
 * @property {Component} ValidatedText - 유효성 검사에 대한 안내 문구입니다.
 *
 * @example
    <InputArea>
      <InputArea.Label>비밀번호 입력</InputArea.Label>
      <InputArea.Input />
      <InputArea.ValidatedText>* 8-20자 이내 숫자, ...</InputArea.ValidatedText>
    </InputArea>
 */
export const InputArea = Object.assign(InputMain, {
  DuplicateCheck: InputDuplicateCheck,
  Input: InputCore,
  Label: InputLabel,
  ValidatedText: InputValidatedText,
});
export default InputArea;

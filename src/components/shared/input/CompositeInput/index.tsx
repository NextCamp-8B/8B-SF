import CompInputCore from './CompInputCore';
import CompInputLabel from './CompInputLabel';
import CompInputMain from './CompInputMain';
import CompInputValidatedText from './CompInputValidatedText';

/**
 * InputArea 는 분리된 컴포넌트를 사용처에서 조합해 사용합니다.
 *
 * @property {Component} Input - input 태그가 사용되는 핵심 컴포넌트 입니다.
 * @property {Component} Label - 무엇에 대한 input 태그인지 설명합니다.
 * @property {Component} ValidatedText - 유효성 검사에 대한 안내 문구입니다.
 *
 * @example
    <CompositeInput>
      <CompositeInput.Label>비밀번호 입력</CompositeInput.Label>
      <CompositeInput.Input />
      <CompositeInput.ValidatedText>* 8-20자 이내 숫자, ...</CompositeInput.ValidatedText>
    </CompositeInput>
 */
export const CompositeInput = Object.assign(CompInputMain, {
  Input: CompInputCore,
  Label: CompInputLabel,
  ValidatedText: CompInputValidatedText,
});
export default CompositeInput;

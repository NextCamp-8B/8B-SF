import InputCore from './inputCore';
import InputCoreWrapper from './inputCoreWrapper';

export default function InputDuplicateCheck() {
  return (
    <InputCoreWrapper>
      <InputCore />
      <button>중복 확인</button>
    </InputCoreWrapper>
  );
}

import InputCore from './InputCore';
import InputCoreWrapper from './InputCoreWrapper';

export default function InputDuplicateCheck() {
  return (
    <InputCoreWrapper>
      <InputCore />
      <button>중복 확인</button>
    </InputCoreWrapper>
  );
}

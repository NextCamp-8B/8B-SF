import InputDuplicateCheck from './InputDuplicateCheck';
import InputMain from './InputMain';
import InputSearch from './InputSearch';
import InputValidated from './InputValidated';

/**
 * InputDuplicateCheck, InputValidated 컴포넌트의 TSDoc에서
 * 자세한 사용 방법 확인 가능합니다.
 */
export const InputSet = Object.assign(InputMain, {
  DuplicateCheck: InputDuplicateCheck,
  Validated: InputValidated,
  Search: InputSearch,
});

export default InputSet;

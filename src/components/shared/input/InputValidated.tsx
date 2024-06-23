import CompositeInput from './CompositeInput';
import { conceptMap, statusMap } from './inputConfig';
import useInputValidation from '@/hooks/input/useInputValidation';
import useInputTracker from '@/hooks/input/useInputTracker';
import useInputCheckStatus from '@/hooks/input/useInputCheckStatus';
import { useState } from 'react';
import { Duplicate } from './InputDuplicateCheck';

export type Concept =
  | 'signupId'
  | 'loginId'
  | 'nickname'
  | 'password'
  | 'passwordCheck'
  | 'signupPhone'
  | 'loginPhone'
  | 'birth'
  | 'name'
  | 'email';
export type State = 'default' | 'warning' | 'success' | 'disabled';
type InputValidatedProps = {
  concept: Concept;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  password?: string;
  type: string;
  isSubmit: boolean;
};

/**
 * - InputValidated 는 CompositInput 합성 컴포넌트를 사용해 구현
 *
 * @param {'signupId' | 'loginId' | 'password' | 'passwordCheck' 
 * | 'signupPhone' | 'loginPhone' | 'birth' | 'name' | 'email'} props.type - 문구 결정을 위한 입력 필드의 타입
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - 입력 값이 변경될 때 호출되는 콜백 함수
 * @param {string} props.value - 입력 필드의 값
 *
 * @example
    export default function CSH() {
      const { value, onChangeInputValue } = useInputChange();
      const [isSubmit, setIsSubmit] = useState(false);

      return (
        <InputSet>
          <InputSet.Validated
            onChange={onChangeInputValue}
            value={value.passwordCheck}
            password={value.password}
            type="password"
            concept="passwordCheck"
            isSubmit={isSubmit}
          />
          <InputSet.Validated
            onChange={onChangeInputValue}
            value={value.password}
            type="password"
            concept="password"
            isSubmit={isSubmit}
          />
          <InputSet.Validated
            onChange={onChangeInputValue}
            value={value.signupId}
            type="text"
            concept="signupId"
            isSubmit={isSubmit}
          />
          <InputSet.Validated
            onChange={onChangeInputValue}
            value={value.signupId}
            type="text"
            concept="signupId"
            isSubmit={isSubmit}
          />
          <button onClick={() => setIsSubmit(true)}>임시 버튼</button>
        </InputSet>
      );
    }
 */
export default function InputValidated({
  concept = 'loginId',
  onChange,
  value,
  type = 'text',
  password,
  isSubmit = false,
}: InputValidatedProps) {
  const [isDuplicate] = useState<Duplicate>('beforeConfirm');
  const { isChanged, handleInputValue } = useInputTracker({
    onChange,
  });
  const { isValidated } = useInputValidation({
    value,
    concept,
    password,
    isChanged,
  });
  const { status } = useInputCheckStatus({
    isValidated,
    isDuplicate,
    isSubmit,
  });
  const currentStyleMap = statusMap[status];
  const { labelColor, inputTextColor, borderColor, validatedColor } =
    currentStyleMap;
  const currentTypeMap = conceptMap[concept];
  const { labelText, placeholder, validatedText } = currentTypeMap;
  const isMessageVisible =
    status === 'warning' ||
    status === 'success' ||
    (isChanged && !isValidated);

  return (
    <CompositeInput className="flex flex-col justify-between items-left max-w-[386px] gap-1">
      <CompositeInput.Label
        htmlFor={concept}
        className={`text-${labelColor} b4 font-medium`}
      >
        {labelText}
      </CompositeInput.Label>

      <CompositeInput.Input
        id={concept}
        type={type}
        className={`border border-${borderColor} 
        b4 text-${inputTextColor} font-normal 
        placeholder-grayscale-400 p-4 rounded-lg`}
        onChange={handleInputValue}
        value={value}
        placeholder={placeholder}
        disabled={status === 'disabled'}
      />

      {isMessageVisible && (
        <CompositeInput.ValidatedText
          className={`caption font-medium text-${validatedColor}`}
        >
          {validatedText}
        </CompositeInput.ValidatedText>
      )}
    </CompositeInput>
  );
}

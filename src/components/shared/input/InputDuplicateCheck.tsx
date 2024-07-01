import useInputTracker from '@/hooks/input/useInputTracker';
import CompositeInput from './CompositeInput';
import useInputValidation from '@/hooks/input/useInputValidation';
import useInputCheckStatus from '@/hooks/input/useInputCheckStatus';
import { conceptMap, statusMap } from './inputConfig';
import { useState } from 'react';

type Concept =
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
export type Duplicate = 'duplicate' | 'possible' | 'beforeConfirm';
export type CheckForDuplicate = Exclude<Duplicate, 'beforeConfirm'>;
type Props = {
  concept: Concept;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => CheckForDuplicate;
  value: string;
  type: string;
  isSubmit: boolean;
};

/**
 * - 중복 확인 버튼이 들어간 Input Set 컴포넌트
 *
 *
 * @example
    export default function CSH() {
      const { value, onChangeInputValue } = useInputChange();
      const [isSubmit, setIsSubmit] = useState(false);
      
      //- 중복 확인 결과에 따라 Duplicate 타입 관련 문자열 리턴
      // - 사용 가능: possible
      // - 중복: duplicate
      // returns 'duplicate' | 'possible'
      const handleDuplicate = (): CheckForDuplicate => {
        // api 요청..

        return 'possible';
      };

      return (
        <InputSet>
          <InputSet.DuplicateCheck
            onChange={onChangeInputValue}
            onClick={handleDuplicate}
            value={value.signupId}
            type="text"
            concept="signupId"
            isSubmit={isSubmit}
          />
          <InputSet.DuplicateCheck
            onChange={onChangeInputValue}
            onClick={handleDuplicate}
            value={value.nickname}
            type="text"
            concept="nickname"
            isSubmit={isSubmit}
          />

          <button onClick={() => setIsSubmit(true)}>임시 버튼</button>
        </InputSet>
      );
    }
*/
export default function InputDuplicateCheck({
  concept = 'loginId',
  onChange,
  onClick,
  value,
  type = 'text',
  isSubmit = false,
}: Props) {
  const [isDuplicate, setIsDuplicate] =
    useState<Duplicate>('beforeConfirm');
  const { isChanged, handleInputValue } = useInputTracker({
    onChange,
  });
  const { isValidated } = useInputValidation({
    value,
    concept,
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
  const conceptKO = concept === 'signupId' ? '아이디' : '닉네임';
  return (
    <CompositeInput className="flex flex-col justify-between items-left max-w-[386px] gap-1">
      <CompositeInput.Label
        htmlFor={concept}
        className={`text-${labelColor} b4 font-medium`}
      >
        {labelText}
      </CompositeInput.Label>

      <div className="relative">
        <CompositeInput.Input
          id={concept}
          type={type}
          className={`border border-${borderColor} 
        b4 text-${inputTextColor} font-normal 
        placeholder-grayscale-400 p-4 pr-40 rounded-lg w-full`}
          onChange={handleInputValue}
          value={value}
          placeholder={placeholder}
          disabled={status === 'disabled'}
        />
        {/* 임시 버튼, 팀원이 개발중 warning-100*/}
        <button
          type="button"
          className={`w-[120px] h-[36px] border rounded-lg bg-${
            status === 'warning' ? 'warning-100' : 'primary-900'
          } text-grayscale-0 absolute right-4 top-2.5 
            ${!isValidated ? 'btn-disabled' : 'btn-primary'}
          `}
          onClick={async () => {
            // api 호출로 인한 async 처리
            const isDupl = onClick();
            setIsDuplicate(isDupl);
          }}
          disabled={!isValidated}
        >
          중복 확인
        </button>
      </div>

      {isMessageVisible && (
        <CompositeInput.ValidatedText
          className={`caption font-medium text-${validatedColor}`}
        >
          {isDuplicate === 'possible'
            ? `사용 가능한 ${conceptKO}입니다.`
            : validatedText}
        </CompositeInput.ValidatedText>
      )}
    </CompositeInput>
  );
}

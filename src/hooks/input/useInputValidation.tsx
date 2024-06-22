import { Concept } from '@/components/shared/input/InputValidated';
import { conceptMap } from '@/components/shared/input/inputConfig';
import { useEffect, useState } from 'react';

type Props = {
  value: string;
  concept: Concept;
  password?: string;
  isChanged: boolean;
};

/**
 * - conceptMap 객체를 이용해 유효성 검사를 진행
 * - ValidatedText 컴포넌트의 마운트에 영향
 *
 * @example
    const { isValidated } = useInputValidation({
      value,
      concept,
      password,
      isChanged,
    });

    const isMessageVisible =
    state === 'warning' || state === 'success' || isValidated;

    const { status, handleFocus } = useInputCheckStatus({
      isValidated,
      isDuplicate,
      isSubmit,
    }); 

    {isMessageVisible && (
      <CompositeInput.ValidatedText
        className={`caption font-medium text-${validatedColor}`}
      >
        {validatedText}
      </CompositeInput.ValidatedText>
    )}
*/
export default function useInputValidation({
  value,
  concept,
  password,
  isChanged,
}: Props) {
  const [isValidated, setIsValidated] = useState(false);

  const handleValidate = (
    value: string,
    concept: keyof typeof conceptMap,
    checkValue?: string,
  ): boolean => {
    const { doValidation } = conceptMap[concept];
    if (!doValidation) {
      return true;
    }

    return doValidation(value, checkValue);
  };

  useEffect(() => {
    const isValidated =
      isChanged && handleValidate(value, concept, password);
    console.log('test', isValidated);
    setIsValidated(isValidated);
  }, [value, isChanged]);

  return { isValidated };
}

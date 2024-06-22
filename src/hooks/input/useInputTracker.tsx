import { useState } from 'react';

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * - Input에 타이핑을 한 번이라도 했는지 추적
 * - 그와 별도로 Input의 값을 변경
 *
 * @example
    const { isChanged, handleInputValue } = useInputTracker({
      onChange,
    });

    const { isValidated } = useInputValidation({
      ...
      isChanged,
    });

    <CompositeInput.Input
        onChange={handleInputValue}
        ...
    />
*/
export default function useInputTracker({ onChange }: Props) {
  const [isChanged, setIsChanged] = useState(false);

  const handleInputValue = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsChanged(true);
    onChange(e);
  };

  return { isChanged, handleInputValue };
}

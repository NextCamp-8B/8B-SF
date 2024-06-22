import { useState } from 'react';

/**
 * - Concept 타입과 연관된 값을 변경
 *
 * @example
    export default function CSH() {
    const { value, onChangeInputValue } = useInputChange();

     return (
       <InputSet>
         <InputSet.Validated
           onChange={onChangeInputValue}
           value={value.passwordCheck}
           password={value.password}
           type="password"
           state="default"
           concept="passwordCheck"
         />
         <InputSet.Validated
           onChange={onChangeInputValue}
           value={value.password}
           type="password"
           state="default"
           concept="password"
         />
       </InputSet>
     );
   }
*/
export default function useInputChange() {
  const [value, setValue] = useState({
    signupId: '',
    loginId: '',
    passwordCheck: '',
    password: '',
    signupPhone: '',
    loginPhone: '',
    birth: '',
    name: '',
    email: '',
  });

  const onChangeInputValue = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, name } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  return { value, onChangeInputValue };
}

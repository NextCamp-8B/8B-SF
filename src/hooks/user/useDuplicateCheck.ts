import { useState } from 'react';

// id 중복 검사 커스텀 훅
// api 로딩, handleDuplicate 함수 관리
// 인자로 id를 받아야함
const useDuplicateCheck = (id : string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [duplicatedCheck, setDuplicatedCheck] = useState(false);

  const handleDuplicate = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/user?signupId=${id}`);
    const result = await response.json();
    if (result.message === 'duplicate') {
      setIsLoading(false);
      setDuplicatedCheck(false);
      return 'duplicate';
    } else {
      setIsLoading(false);
      setDuplicatedCheck(true);
      return 'possible';
    }
  };

  return {
    isLoading,
    duplicatedCheck,
    handleDuplicate,
  };
};

export default useDuplicateCheck;

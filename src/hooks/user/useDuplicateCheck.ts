import { useEffect, useState } from 'react';

// id 중복 검사 커스텀 훅
// api 로딩, handleDuplicate 함수 관리
// 인자로 id를 받아야함
// previousValue 값으로 중복검사 이후에 id변경시 재중복검사 요청
const useDuplicateCheck = (id: string, initialId?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [duplicatedCheck, setDuplicatedCheck] = useState(false);
  const [previousValue, setPreviousValue] = useState('');

  // 수정시 initalId 값과 id 값이같다면 중복검사 건너뛰기
  useEffect(() => {
    if (initialId && id === initialId) {
      setDuplicatedCheck(true);
    } else if (id !== previousValue) {
      // 중복검사 이후 id값 변경 시 다시 중복검사 유도
      setDuplicatedCheck(false);
    }
  }, [id, initialId, previousValue]);

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
      setPreviousValue(id);
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

import { Status } from '@/components/shared/input/inputConfig';
import { useEffect, useState } from 'react';

/**
 * - 어떤 Status 타입인지 구분
 * - 기본 상태 및 포커스 상태, 성공, 중복, 제출시 미흡 상태 등을 체크 
 *
 * @example
    const { status, handleFocus } = useInputCheckStatus({
      isValidated,
      isDuplicate,
      isSubmit,
    });

    const currentStyleMap = statusMap[status];

    <CompositeInput.Input
      ...
      onFocus={() => handleFocus(true)}
      onBlur={() => handleFocus(false)}
      ...
    />

*/
export default function useInputCheckStatus({
  isValidated, // 유효성검사 통과여부
  isDuplicate = 'beforeConfirm', // 아이디&닉네임 중복검사 및 비밀번호 중복체크
  isSubmit, // 완료 & 다음 버튼 눌렀을시 데이터 부족 여부
}: {
  isValidated: boolean;
  isDuplicate?: 'duplicate' | 'possible' | 'beforeConfirm';
  isSubmit: boolean;
}) {
  const [status, setStatus] = useState<Status>('default');
  const [isFocus, setIsFocus] = useState(false);
  const handleFocus = (isFocus: boolean) => {
    setIsFocus(isFocus);
  };

  useEffect(() => {
    const isMissing = isSubmit && !isValidated;
    const isWarning =
      (!isValidated && isDuplicate === 'duplicate') || isMissing;
    const isSuccess = isDuplicate === 'possible';
    // isFocus가 true일 때는 'active'로 설정
    if (isFocus) {
      setStatus('active');
    } else {
      if (!isWarning && !isSuccess) {
        setStatus('default'); // default -> 기본
      }
      if (isSuccess) {
        setStatus('success'); // success -> 중복 확인 통과
      }
      if (isWarning) {
        setStatus('warning'); // warning -> 비번 틀렸을 때(중복 확인), 중복체크 틀렸을 때, 다음 버튼을 눌렀는데 부족한 게 있는 부분
      }
      // disabled 상태 처리 로직을 추가할 수도 있음
    }
  }, [isFocus, isSubmit, isValidated, isDuplicate]);

  return { status, handleFocus };
}

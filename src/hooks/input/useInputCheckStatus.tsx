import { Status } from '@/components/shared/input/inputConfig';
import { useEffect, useState } from 'react';

/**
 * - 어떤 Status 타입인지 구분
 * - 기본 상태 및 포커스 상태, 성공, 중복, 제출시 미흡 상태 등을 체크 
 *
 * @example
    const { status } = useInputCheckStatus({
      isValidated,
      isDuplicate,
      isSubmit,
    });

    const currentStyleMap = statusMap[status];
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

  useEffect(() => {
    const isMissing = isSubmit && !isValidated;
    const isWarning =
      (!isValidated && isDuplicate === 'duplicate') ||
      isMissing ||
      isDuplicate === 'duplicate';
    const isSuccess = isDuplicate === 'possible';

    let newStatus: Status = 'default';

    if (isWarning) {
      newStatus = 'warning';
    } else if (isSuccess) {
      newStatus = 'success';
    }

    if (newStatus !== status) {
      setStatus(newStatus);
    }
  }, [isSubmit, isValidated, isDuplicate]);

  return { status };
}

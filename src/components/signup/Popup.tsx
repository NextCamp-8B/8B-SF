import Wrapper from '@/components/shared/Wrapper';
import TextButton from '@/components/shared/buttons/TextButton';

type AuthPopupProps = {
  onClose: () => void;
  error: boolean;
  errorMessage?: string | null;
  title?: string;
};

export default function AuthPopup({
  onClose,
  error,
  title,
  errorMessage,
}: AuthPopupProps) {
  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  const successMessage =
    '작성하신 이메일 주소로 인증메일을 전송했습니다.\n메일 확인 후 회원가입을 계속 진행해주세요.';
  const defaultErrorMessage =
    '인증 링크 전송에 실패했습니다.\n다시 시도하시거나 고객센터에 문의해주세요.';
  return (
    <div
      className="fixed inset-0 z-50 bg-grayscale-900 bg-opacity-65 flex justify-center items-center h-[100%] w-[100%]"
      onClick={onClose}
    >
      <Wrapper padding="px-14 py-6" width="w-[430px]">
        <div
          className="flex flex-col gap-y-4 items-center"
          onClick={handleModalClick}
        >
          <h3 className="b2 font-bold text-primary-900">
            {title
              ? title
              : error
              ? '인증 링크 전송 실패'
              : '인증 링크를 전송했습니다.'}
          </h3>
          <p className="text-center font-medium b4 whitespace-pre-line">
            {error
              ? errorMessage || defaultErrorMessage
              : successMessage}
          </p>
          <TextButton className="mt-4 w-[332px]" onClick={onClose}>
            확인
          </TextButton>
        </div>
      </Wrapper>
    </div>
  );
}

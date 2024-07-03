'use client';
import Wrapper from '@/components/shared/Wrapper';
import TextButton from '@/components/shared/buttons/TextButton';
// import Link from 'next/link';
import { useRouter } from 'next/navigation';

type AuthPopupProps = {
  onClose: () => void;
};

export default function AuthPopup({ onClose }: AuthPopupProps) {
  const router = useRouter();

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

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
            인증 링크를 전송했습니다
          </h3>
          <p className="text-center font-medium b4">
            작성하신 이메일 주소로 인증메일을 전송했습니다.
            <br />
            메일 확인 후 회원가입을 계속 진행해주세요.
          </p>
          <TextButton className="mt-4 w-[332px]" onClick={onClose}>
            확인
          </TextButton>
        </div>
      </Wrapper>
    </div>
  );
}

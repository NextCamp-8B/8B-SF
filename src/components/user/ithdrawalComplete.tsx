import Link from 'next/link';
import Wrapper from '../shared/Wrapper';
import TextButton from '../shared/buttons/TextButton';

export default function WithdrawalComplete() {
  return (
    <>
      <main className="mt-20">
        <Wrapper padding="px-24 py-20" width="w-[590px]">
          <div className="flex flex-col gap-y-4 items-center">
            <h3 className="h3 font-bold text-center text-primary-900 mb-8">
              회원탈퇴가 완료되었습니다.
            </h3>
            <p className="text-center font-medium b3">
              아잇나우를 이용해주셔서 감사합니다. <br />
              더욱 더 노력하고 발전하는 아잇나우가 되겠습니다.
            </p>
            <Link href="/login">
              <TextButton className="mt-4 w-[332px]">
                로그인
              </TextButton>
            </Link>
          </div>
        </Wrapper>
      </main>
    </>
  );
}

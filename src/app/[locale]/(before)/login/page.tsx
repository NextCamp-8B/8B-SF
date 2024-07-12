'use client';
import { useCallback, useEffect, useState } from 'react';
import Wrapper from '@/components/shared/Wrapper';
import InputSet from '@/components/shared/input/index';
import useInputChange from '@/hooks/input/useInputChange';
import TextButton from '@/components/shared/buttons/TextButton';
import CheckBox from '@/components/shared/Checkbox';
import IconButton from '@/components/shared/buttons/IconButton';
import Link from 'next/link';
import { conceptMap } from '@/components/shared/input/inputConfig';
import { signIn } from 'next-auth/react';
import AuthPopup from '@/components/signup/Popup';
import {useRouter} from 'next/navigation';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

// w-[590px]  h-[668px]

export default function Login() {
  const router = useRouter();
  const [isShowPopup, setIsShowPopup] = useState(false); // 팝업 조건부 렌더링
  const [errorMsg, setErrorMsg] = useState({
    // 로그인 에러 메세지
    title: '',
    msg: '',
  });
  const { value, onChangeInputValue } = useInputChange();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isAutoLogin, setIsAutoLogin] = useState(false); //자동로그인 여부
  const [isFormValid, setIsFormValid] = useState(false); //유효성 검사폼
  const [isLoading, setIsLoading] = useState(false);

  // 일반 로그인
  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!isFormValid) return console.log('isFormValid unset');
    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        email: value.loginId, // 여기서 loginId는 userId를 의미
        password: value.password,
        redirect: false,
      });
  
      if (result?.error) {
        setIsShowPopup(true);
        setErrorMsg({
          title: '로그인 실패',
          msg: '아이디 또는 비밀번호를 다시 확인해주세요.',
        });
      } else {
        // console.log('로그인 성공:', result);
        router.push('/home'); // 홈 페이지로 이동   
      }
    } catch(error) {
       console.error('로그인 실패:', error); 
    }finally{
      setIsLoading(false);
    }
  }
  
   
  const validateForm = useCallback(() => {
    const isPasswordValid = conceptMap.password.doValidation(
      value.password,
    );
    const isLoginIdValid = conceptMap.loginId.doValidation(
      value.loginId,
    );

    setIsFormValid(isLoginIdValid && isPasswordValid);
  }, [value.loginId, value.password]);

  useEffect(() => {
    validateForm();
  }, [value, validateForm]);

  // 소셜 카카오 로그인
  const handleKakakoLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signIn('kakao', { callbackUrl: '/home' });
      if(result?.error) {
        setIsShowPopup(true);
        setErrorMsg({
          title: '카카오 로그인 실패',
          msg: result.error || '카카오 로그인 오류, 카카오 계정을 다시 확인하거나, 고객센터에 문의해주세요.',
        });
      }
    } catch (error : any) {
      console.log(error, '카카오 로그인 요청 중 에러 발생:', error);
    } finally{
      setIsLoading(false);
    }
  };

  // 소셜 구글 로그인
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signIn('google', { callbackUrl: '/home' });

      if (result?.error) {
        setIsShowPopup(true);
        setErrorMsg({
          title: '구글 로그인 실패',
          msg: result?.error || '구글 로그인 오류, 구글 계정을 다시 확인하거나, 고객센터에 문의해주세요.',
        });
      }
    } catch (error : any) {
      console.log(error, '구글 로그인 요청 중 에러 발생:', error);
    }
    finally{
      setIsLoading(false);
    }
  };

  // 소셜 구글 로그인
  const handleNaverLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signIn('naver', { callbackUrl: '/home'});
  
      if (result?.error) {
        setIsShowPopup(true);
        setErrorMsg({
          title: '네이버 로그인 실패',
          msg: result.error || '네이버 오류, 네이버 계정을 다시 확인하거나, 고객센터에 문의해주세요.',
        });
      }
    } catch (error) {
      console.error('네이버 로그인 요청 중 에러 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 에러 팝업 닫기
  const handleClosePopuup = () => {
    setIsShowPopup(false);
  };

  return (
    <>
      {isShowPopup && (
        <AuthPopup
          onClose={handleClosePopuup}
          error={true}
          title={errorMsg.title}
          errorMessage={errorMsg.msg}
        />
      )}

      <main className="flex justify-center items-center h-screen">
        <Wrapper padding="px-24 py-20" width="w-[590px]">
          <div className="flex flex-col w-96 h-full">
            <h3 className="h3 font-bold text-center mb-10 text-primary-900">
              로그인
            </h3>
            {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <LoadingSpinner />
            </div>
            )
            : ( 
              <>
              {/* 로그인 입력 폼 */}
              <form onSubmit={onHandleSubmit}>
                <InputSet className="flex flex-col gap-4">
                  <InputSet.Validated
                    onChange={onChangeInputValue}
                    value={value.loginId}
                    type="loginId"
                    concept="loginId"
                    isSubmit={isSubmit}
                  />
                  <InputSet.Validated
                    onChange={onChangeInputValue}
                    value={value.password}
                    type="password"
                    concept="password"
                    isSubmit={isSubmit}
                  />
                  {/* submit 로그인 버튼 */}
                  <TextButton>로그인</TextButton>
                </InputSet>
              </form>
  
              {/* 자동로그인, 아이디, 비밀번호 찾기 라우트 */}
              <div className="flex flex-col mt-4 gap-y-4">
                <div className="flex px-1 justify-between font-nomal b5">
                  <CheckBox
                    label="자동 로그인"
                    checked={isAutoLogin}
                    onChange={() => setIsAutoLogin(!isAutoLogin)}
                  />
                  <div className="space-x-2">
                    <Link
                      href="/find/id"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      아이디 찾기
                    </Link>
                    <span>|</span>
                    <Link
                      href="/find/pw"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      비밀번호 찾기
                    </Link>
                  </div>
                </div>
  
                {/* 회원가입 라우트*/}
                <div className="flex justify-between px-1 b5">
                  <p className="text-sm">아직 회원이 아니신가요? </p>
                  <Link
                    href="/signup"
                    className="text-secondary-600 underline"
                  >
                    아잇나우 회원가입
                  </Link>
                </div>
  
                <div className="relative flex items-center justify-center my-2 b5">
                  <div className="absolute inset-0 flex items-center">
                    <hr className="w-full border-t border-grayscale-400" />
                  </div>
                  <div className="relative bg-grayscale-0 px-2 text-grayscale-600">
                    또는
                  </div>
                </div>
              </div>
  
              {/* 소셜 로그인 버튼 */}
              <div className="flex items-center justify-center mt-4 space-x-4">
                <IconButton.Kakao onClick={handleKakakoLogin} />
                <IconButton.Naver onClick={handleNaverLogin}/>
                <IconButton.Google onClick={handleGoogleLogin} />
              </div>
            </> 
            )}
          </div>
        </Wrapper>
      </main>
    </>
  );
}

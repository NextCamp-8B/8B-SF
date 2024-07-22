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
import { useTranslations } from 'next-intl';
import LoadingSpinnerWrapper from '@/components/shared/LoadingSpinnerWrapper';
import usePopupStore from '@/store/userPopup';
import { useRouter } from 'next/navigation';

// w-[590px]  h-[668px]

export default function Login() {
  const { isShowPopup, popupMsg, hidePopup, showPopup } =
    usePopupStore();
  const router = useRouter();
  const { value, onChangeInputValue } = useInputChange();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isAutoLogin, setIsAutoLogin] = useState(false); //자동로그인 여부
  const [isFormValid, setIsFormValid] = useState(false); //유효성 검사폼
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('Login');

  // 일반 로그인
  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!isFormValid) return;
    setIsLoading(true);
    const result = await signIn('credentials', {
      email: value.loginId, // 여기서 loginId는 userId를 의미
      password: value.password,
      autoLogin: isAutoLogin, //자동 로그인 여부
      redirect: false,
    });

    if (result?.error) {
      showPopup(
        t('PopupMessages.login_fail'),
        t('PopupMessages.login_fail_msg'),
      );
      setIsLoading(false);
    } else {
      router.replace('/home');
    }
  };

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
    const result = await signIn('kakao', { callbackUrl: '/home' });
    if (result?.error) {
      showPopup(
        t('PopupMessages.kakao_login_fail'),
        result.error || t('PopupMessages.kakao_login_fail_msg'),
      );
    }
    setIsLoading(false);
  };

  // 소셜 구글 로그인
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const result = await signIn('google', { callbackUrl: '/home' });

    if (result?.error) {
      showPopup(
        t('PopupMessages.google_login_fail'),
        result?.error || t('PopupMessages.google_login_fail_msg'),
      );
    }
    setIsLoading(false);
  };

  // 소셜 네이버 로그인
  const handleNaverLogin = async () => {
    setIsLoading(true);
    const result = await signIn('naver', { callbackUrl: '/home' });

    if (result?.error) {
      showPopup(
        t('PopupMessages.naver_login_fail'),
        result.error || t('PopupMessages.naver_login_fail_msg'),
      );
    }
    setIsLoading(false);
  };

  return (
    <>
      {isShowPopup && (
        <AuthPopup
          onClose={hidePopup}
          error={true}
          title={popupMsg.title}
          errorMessage={popupMsg.msg}
        />
      )}

      <main className="flex justify-center items-center h-screen">
        <Wrapper padding="px-24 py-20" width="w-[590px]">
          <div className="flex flex-col w-96 h-full">
            <h3 className="h3 font-bold text-center mb-10 text-primary-900">
              {t('login')}
            </h3>
            <LoadingSpinnerWrapper isLoading={isLoading}>
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
                  <TextButton>{t('login')}</TextButton>
                </InputSet>
              </form>

              {/* 자동로그인, 아이디, 비밀번호 찾기 라우트 */}
              <div className="flex flex-col mt-4 gap-y-4">
                <div className="flex px-1 justify-between font-nomal b5">
                  <CheckBox
                    label={t('auto_login')}
                    checked={isAutoLogin}
                    onChange={() => setIsAutoLogin(!isAutoLogin)}
                  />
                  <div className="flex flex-nowrap space-x-2 ">
                    <Link
                      href="/find/id"
                      className="text-sm text-blue-500 hover:underline text-right"
                    >
                      {t('find_id')}
                    </Link>
                    <span>|</span>
                    <Link
                      href="/find/pw"
                      className="text-sm text-blue-500 hover:underline text-left"
                    >
                      {t('find_pw')}
                    </Link>
                  </div>
                </div>

                {/* 회원가입 라우트*/}
                <div className="flex justify-between px-1 b5">
                  <p className="text-sm">{t('signup')} </p>
                  <Link
                    href="/signup"
                    className="text-secondary-600 underline"
                  >
                    {t('signup')}
                  </Link>
                </div>

                <div className="relative flex items-center justify-center my-2 b5">
                  <div className="absolute inset-0 flex items-center">
                    <hr className="w-full border-t border-grayscale-400" />
                  </div>
                  <div className="relative bg-grayscale-0 px-2 text-grayscale-600">
                    {t('or')}
                  </div>
                </div>
              </div>

              {/* 소셜 로그인 버튼 */}
              <div className="flex items-center justify-center mt-4 space-x-4">
                <IconButton.Kakao onClick={handleKakakoLogin} />
                <IconButton.Naver onClick={handleNaverLogin} />
                <IconButton.Google onClick={handleGoogleLogin} />
              </div>
            </LoadingSpinnerWrapper>
          </div>
        </Wrapper>
      </main>
    </>
  );
}

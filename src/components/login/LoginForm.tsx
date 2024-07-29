import { useCallback, useEffect, useState } from 'react';
import InputSet from '@/components/shared/input/index';
import TextButton from '@/components/shared/buttons/TextButton';
import { conceptMap } from '@/components/shared/input/inputConfig';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import useInputChange from '@/hooks/input/useInputChange';
import usePopupStore from '@/store/userPopup';

type LoginFormProps = {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

const LoginForm = ({ isLoading, setIsLoading }: LoginFormProps) => {
  const router = useRouter();
  const { value, onChangeInputValue } = useInputChange();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const t = useTranslations('Login');
  const { showPopup } = usePopupStore();

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

  const onHandleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmit(true);
      if (!isFormValid) return;
      setIsLoading(true);
      const result = await signIn('credentials', {
        email: value.loginId, // 여기서 loginId는 userId를 의미
        password: value.password,
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
    },
    [
      isFormValid,
      router,
      setIsLoading,
      showPopup,
      t,
      value.loginId,
      value.password,
    ],
  );

  return (
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
        <TextButton aria-label={t('login')} disabled={isLoading}>
          {t('login')}
        </TextButton>
      </InputSet>
    </form>
  );
};

export default LoginForm;

import IconButton from '@/components/shared/buttons/IconButton';
import { handleSocialLogin } from '@/utils/user/handleSocialLogin';
import { useTranslations } from 'next-intl';
import usePopupStore from '@/store/userPopup';

type SocialLoginButtonsProps = {
  setIsLoading: (loading: boolean) => void;
};

const SocialLoginButtons = ({
  setIsLoading,
}: SocialLoginButtonsProps) => {
  const t = useTranslations('Login');
  const { showPopup } = usePopupStore();

  const handleKakaoLogin = async () => {
    setIsLoading(true);
    await handleSocialLogin('kakao', '/home', showPopup, t);
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await handleSocialLogin('google', '/home', showPopup, t);
    setIsLoading(false);
  };

  const handleNaverLogin = async () => {
    setIsLoading(true);
    await handleSocialLogin('naver', '/home', showPopup, t);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center mt-4 space-x-4">
      <IconButton.Kakao
        onClick={handleKakaoLogin}
        aria-label="kakakoLoginButton"
      />
      <IconButton.Naver
        onClick={handleNaverLogin}
        aria-label="NaverLoginButton"
      />
      <IconButton.Google
        onClick={handleGoogleLogin}
        aria-label="GoogleLoginButton"
      />
    </div>
  );
};

export default SocialLoginButtons;

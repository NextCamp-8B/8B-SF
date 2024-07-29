import { signIn, SignInResponse } from 'next-auth/react';

type ShowPopup = (title: string, message: string) => void;
type Translate = (key: string) => string;

export const handleSocialLogin = async (
  provider: string,
  callbackUrl: string,
  showPopup: ShowPopup,
  t: Translate,
): Promise<void> => {
  const result: SignInResponse | undefined = await signIn(provider, {
    callbackUrl,
  });
  if (result?.error) {
    showPopup(
      t(`PopupMessages.${provider}_login_fail`),
      result.error || t(`PopupMessages.${provider}_login_fail_msg`),
    );
  }
};

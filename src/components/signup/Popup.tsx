import Wrapper from '@/components/shared/Wrapper';
import TextButton from '@/components/shared/buttons/TextButton';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations();

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  const successMessage = t('SignUp.authenticate_content');
  const defaultErrorMessage = t('SignUp.authenticate_content_failed');
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
              ? t('SignUp.send_link_failed')
              : t('SignUp.send_link')}
          </h3>
          <p className="text-center font-medium b4 whitespace-pre-line">
            {error
              ? errorMessage || defaultErrorMessage
              : successMessage}
          </p>
          <TextButton className="mt-4 w-[332px]" onClick={onClose}>
            {t('SignUp.confirm')}
          </TextButton>
        </div>
      </Wrapper>
    </div>
  );
}

import Wrapper from '@/components/shared/Wrapper';
import TextButton from '@/components/shared/buttons/TextButton';
import { useTranslations } from 'next-intl';

type ConfirmCancelPopupProps = {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  msg: string;
};

export default function ConfirmCancelPopup({
  onClose,
  onConfirm,
  title,
  msg,
}: ConfirmCancelPopupProps) {
  const t = useTranslations('MyPage');

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
          <h3 className="b2 font-bold text-primary-900">{title}</h3>
          <p className="text-center font-medium b4 whitespace-pre-line">
            {msg}
          </p>
          <div className="flex justify-between w-full mt-4">
            <TextButton
              className="w-[150px]"
              onClick={onConfirm}
              aria-label={t('confirm')}
            >
              {t('confirm')}
            </TextButton>
            <TextButton.Gray
              className="w-[150px]"
              onClick={onClose}
              aria-label={t('cancle')}
            >
              {t('cancle')}
            </TextButton.Gray>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

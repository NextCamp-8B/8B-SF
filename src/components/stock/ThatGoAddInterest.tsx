import { useTranslations } from 'next-intl';
import ButtonBase from '../shared/buttons/ButtonBase';
import { UserData } from '@/service/serviceType';

export default function ThatGoAddInterest({
  handleIsOpen,
  user,
}: {
  handleIsOpen: () => void;
  user: UserData;
}) {
  const t = useTranslations();
  const nickname = user && user.nickname;

  return (
    <div className="flex justify-between">
      <h2 className="h4 font-semibold text-primary-900">
        {t('InterestStock.interest_stock', { nickname })}
      </h2>
      <ButtonBase
        className={`b5 font-normal px-14 
        py-2 rounded-lg min-w-[189px] hover:bg-opacity-90 
        active:bg-opacity-95 text-grayscale-0 bg-primary-900 
        hover:opacity-90 active:opacity-95`}
        onClick={handleIsOpen}
      >
        {t('InterestStock.add_stock')}
      </ButtonBase>
    </div>
  );
}

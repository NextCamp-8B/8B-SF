import { useTranslations } from 'next-intl';

type MoreDataProps = {
  onClick: () => void;
  isVisible: boolean;
};

export default function MoreData({
  onClick,
  isVisible,
}: MoreDataProps) {
  const t = useTranslations('Search');
  return (
    <>
      {isVisible && (
        <div
          className="w-full h-10 flex flex-col items-center border-t-2 border-grayscale-300 cursor-pointer"
          onClick={onClick}
        >
          <p className="b4 font-medium text-grayscale-400 pt-4">
            {t('view_more')}
          </p>
        </div>
      )}
    </>
  );
}

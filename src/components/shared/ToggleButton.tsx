import { Locale } from '@/types/next-auth';
import { getFormat } from '@/utils/stock';

type ToggleButtonProps = {
  isDollar: boolean;
  setIsDollar: React.Dispatch<React.SetStateAction<boolean>>;
  locale: Locale;
};

export default function ToggleButton({
  isDollar,
  setIsDollar,
  locale,
}: ToggleButtonProps) {
  return (
    <>
      <div className="w-[76px] h-[40px] bg-grayscale-200 rounded flex gap-1 justify-center items-center">
        <div
          className={`w-[32px] h-[32px] flex justify-center items-center cursor-pointer rounded
            ${isDollar ? 'bg-[#ffffff]' : 'bg-transparent'}`}
          onClick={() => setIsDollar(true)}
        >
          <span
            className={`b2  ${
              isDollar
                ? 'text-black font-bold'
                : 'text-grayscale-4 00'
            }`}
          >
            {getFormat('en')}
          </span>
        </div>
        <div
          className={`w-[32px] h-[32px] flex justify-center items-center cursor-pointer rounded
            ${!isDollar ? 'bg-[#ffffff]' : 'bg-transparent'}`}
          onClick={() => setIsDollar(false)}
        >
          <span
            className={`b2 ${
              !isDollar
                ? 'text-black font-bold '
                : 'text-grayscale-400'
            }`}
          >
            {getFormat(locale)}
          </span>
        </div>
      </div>
    </>
  );
}

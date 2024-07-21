import SkeletonText from '../shared/SkeletonText';
import SMALLLOGO from '@/assets/logos/small_logo_light.svg';
export default function SkeletonChatbotContent() {
  return (
    <>
      <div className="flex items-start space-x-2 w-4/5 break-words p-6 ">
        <div className="flex justify-center items-center bg-primary-900 min-w-[48px] max-w-[48px] min-h-[48px] rounded-md">
          <SMALLLOGO width={28} height={24} />
        </div>
        <SkeletonText
          type="b5"
          className="w-full h-[60px]"
        ></SkeletonText>
      </div>
    </>
  );
}

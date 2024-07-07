import SkeletonText from '../shared/SkeletonText';

export default function SkeletonChatbotContent() {
  return (
    <>
      <SkeletonText
        type="b5"
        className="w-[200px] h-[60px]"
      ></SkeletonText>
    </>
  );
}

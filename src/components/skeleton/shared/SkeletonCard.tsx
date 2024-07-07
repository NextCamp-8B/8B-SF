import Skeleton from './Skeleton';
import SkeletonIcon from './SkeletonIcon';
import SkeletonText from './SkeletonText';
import SkeletonWrapper from './SkeletonWrapper';

type CardProps = {
  type: 'News1' | 'News2' | 'News3' | 'News4';
};

export default function SkeletonCard({ type }: CardProps) {
  return (
    <>
      {type === 'News1' && (
        <SkeletonWrapper className="w-[355px] h-[100px] rounded-2xl">
          <div className="flex">
            <div className="flex gap-2 flex-1 flex-col pr-8 ml-4 mt-6 ">
              <Skeleton className="w-20 h-[14px] rounded-md" />
              <Skeleton className="w-11/12 h-5 rounded-md" />
            </div>
            <Skeleton className="w-12 h-12 rounded-full mr-4 mt-6" />
          </div>
        </SkeletonWrapper>
      )}
      {type === 'News2' && (
        <SkeletonWrapper className="w-[388px] h-[360px] rounded-2xl">
          <Skeleton className="w-[388px] h-[236px] rounded-t-2xl"></Skeleton>
          <SkeletonText
            type="b3"
            className="w-[300px] mt-8 ml-4"
          ></SkeletonText>
          <SkeletonText
            type="b5"
            className="w-[100px] ml-4 mt-8"
          ></SkeletonText>
        </SkeletonWrapper>
      )}
      {type === 'News3' && (
        <SkeletonWrapper className="w-[590px] h-[420px] rounded-2xl">
          <Skeleton className="w-[590px] h-[286px] rounded-t-2xl"></Skeleton>
          <SkeletonText
            type="b1"
            className="w-[300px] mt-8 ml-4"
          ></SkeletonText>
          <SkeletonText
            type="b5"
            className="w-[100px] ml-4 mt-8"
          ></SkeletonText>
        </SkeletonWrapper>
      )}
      {type === 'News4' && (
        <SkeletonWrapper className="w-[590px] h-[200px] rounded-2xl">
          <Skeleton className="w-[590px] h-[100px] rounded-t-2xl"></Skeleton>
          <SkeletonText
            type="b1"
            className="w-[300px] ml-4 mt-4"
          ></SkeletonText>
          <SkeletonText
            type="b5"
            className="w-[100px] ml-4 mt-4"
          ></SkeletonText>
        </SkeletonWrapper>
      )}
    </>
  );
}

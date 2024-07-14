import RecentItem from './RecentItem';

export default function Recent() {
  return (
    <>
      <div className="flex flex-col">
        <div className="h4 font-bold text-primary-900">최근 조회</div>
        <div className="flex flex-col justify-center items-center bg-[#FFFFFF] rounded-2xl mt-6 min-w-[590px] min-h-[374px] ">
          <RecentItem />
        </div>
      </div>
    </>
  );
}

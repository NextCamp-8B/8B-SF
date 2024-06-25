import NoData from './NoData';
import RecentItem from './RecentItem';

type recentProps = {
  name: string;
  subname: string;
  value: string;
  tmp1: number;
  tmp2: number;
};

export default function Recent({ data }: { data: recentProps[] }) {
  return (
    <>
      <div className="flex flex-col">
        <div className="h4 font-bold text-primary-900">최근 조회</div>
        <div className="flex flex-col justify-center items-center bg-[#FFFFFF] rounded-2xl mt-6 min-w-[590px] min-h-[374px] ">
          {data ? <RecentItem stocks={data} /> : <NoData />}
        </div>
      </div>
    </>
  );
}

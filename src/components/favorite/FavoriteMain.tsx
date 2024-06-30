import NotFind from '../search/NotFind';
import FavoriteItem from './FavoriteItem';

type recentProps = {
  id: string;
  name: string;
  subname: string;
  value: string;
  tmp1: number;
  tmp2: number;
  path: string;
};

export default function Recent({
  data,
}: {
  data: recentProps[] | null;
}) {
  return (
    <>
      <div className="flex flex-col">
        <div className="h4 font-bold text-primary-900">관심 종목</div>
        <div className="flex flex-col justify-center items-center bg-[#FFFFFF] rounded-2xl mt-6 min-w-[590px] min-h-[374px] ">
          {data ? (
            <FavoriteItem stocks={data} />
          ) : (
            <NotFind type="stock" />
          )}
        </div>
      </div>
    </>
  );
}

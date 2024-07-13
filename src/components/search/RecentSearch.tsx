import Time from '@/assets/icons/time.svg';
import { searchDate } from '@/utils/date';
import DeleteSearch from './DeleteSearch';
import SearchHeading from './SearchHeading';
import SearchLabel from './SearchLabel';
import { stocksProps } from './InputItem';
import { Session } from 'next-auth';
import { UUID } from 'crypto';

export default function RecentSearch({
  recentDatas,
  session,
  setRecentDatas,
}: {
  recentDatas: stocksProps[] | null;
  session: Session | null;
  setRecentDatas: (data: stocksProps[] | null) => void;
}) {
  const { user } = session || { user: null };

  return (
    <div className="w-[590px]">
      <div className="flex items-center justify-between">
        <SearchHeading> 최근 검색어</SearchHeading>
        <DeleteSearch
          type="all"
          userId={user?.id as UUID}
          setRecentDatas={setRecentDatas}
        />
      </div>
      <div className="w-full rounded-2xl shadow-md bg-grayscale-0 py-6 ">
        {recentDatas &&
          recentDatas.map((recentData, i) => {
            return (
              <div
                className="flex justify-between items-center px-6 py-2 "
                key={i}
              >
                <div className="flex ">
                  <div>
                    <Time width={24} height={24} />
                  </div>
                  <SearchLabel data={recentData} />
                </div>
                <div className="flex items-center">
                  <p className="b5 text-grayscale-400 px-2 cursor-default">
                    {searchDate(recentData.created_at)}
                  </p>
                  <button type="submit">
                    <DeleteSearch
                      type="select"
                      userId={user?.id as UUID}
                      stockId={recentData?.stock_id as UUID}
                      setRecentDatas={setRecentDatas}
                    />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

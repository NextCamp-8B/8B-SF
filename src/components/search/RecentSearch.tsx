import Time from '@/assets/icons/time.svg';
import Link from 'next/link';
import { searchDate } from '@/utils/date';
import DeleteSearch from './DeleteSearch';

type searchDatasProps = {
  id?: string;
  name?: string;
  subname?: string;
  date?: string;
  iscompleted?: boolean;
};

type deleteProps = {
  type: 'all' | 'select';
  id?: string;
  data?: string;
  iscompleted?: boolean;
};

export default function RecentSearch({
  searchDatas,
}: {
  searchDatas: searchDatasProps[] | null;
}) {
  return (
    <div className="w-[590px]">
      <div className="flex items-center justify-between">
        <div className="min-w-[110px] b1 font-bold text-primary-900 my-2">
          최근 검색어
        </div>
        <DeleteSearch type="all" />
      </div>
      <div className="w-full rounded-2xl shadow-md bg-grayscale-0 py-6 ">
        {searchDatas &&
          searchDatas.map((searchData, i) => {
            return (
              <div
                className="flex justify-between items-center px-6 py-2 "
                key={i}
              >
                <div className="flex ">
                  <div>
                    <Time width={24} height={24} />
                  </div>
                  <Link href={`/stock/${searchData.id}`}>
                    <p className="text-overflow-1 px-2 hover:underline cursor-pointer">
                      {searchData.name}
                    </p>
                  </Link>
                  {/* <p className="b5 text-grayscale-400 flex items-center px-1">
                    {searchData.subname}
                  </p> */}
                </div>
                <div className="flex items-center">
                  <p className="b5 text-grayscale-400 px-2 cursor-default">
                    {searchDate(searchData.date)}
                  </p>
                  <button type="submit">
                    <DeleteSearch type="select" />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

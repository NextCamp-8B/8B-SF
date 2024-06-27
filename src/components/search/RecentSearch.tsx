import Time from '@/assets/icons/time.svg';
import Link from 'next/link';
import { searchDate } from '@/utils/date';
import DeleteSearch from './DeleteSearch';
import { searchDatasProps } from './InputItem';
import SearchHeading from './SearchHeading';
import SearchLabel from './SearchLabel';

// type deleteProps = {
//   type: 'all' | 'select';
//   id?: string;
//   data?: string;
//   iscompleted?: boolean;
// };

export default function RecentSearch({
  searchDatas,
}: {
  searchDatas: searchDatasProps[] | null;
}) {
  return (
    <div className="w-[590px]">
      <div className="flex items-center justify-between">
        <SearchHeading> 최근 검색어</SearchHeading>
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
                  <SearchLabel data={searchData} />
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

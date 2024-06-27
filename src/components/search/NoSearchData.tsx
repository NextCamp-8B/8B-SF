import NoData from '../recent/NoData';
import SearchHeading from './SearchHeading';

export default function NoSearchData() {
  return (
    <>
      <div className="w-[590px]">
        <SearchHeading> 최근 검색어 </SearchHeading>
        <div className="w-full rounded-2xl shadow-md bg-grayscale-0 py-6 flex justify-center">
          <NoData />
        </div>
      </div>
    </>
  );
}

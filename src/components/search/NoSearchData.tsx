import NoData from '../recent/NoData';

export default function NoSearchData() {
  return (
    <>
      <div className="w-[590px]">
        <div className="flex items-center justify-between">
          <div className="min-w-[110px] b1 font-bold text-primary-900 my-2">
            최근 검색어
          </div>
        </div>
        <div className="w-full rounded-2xl shadow-md bg-grayscale-0 py-6 flex justify-center">
          <NoData />
        </div>
      </div>
    </>
  );
}

import InputItem from '@/components/search/InputItem';
// import NoSearchData from '@/components/search/NoSearchData';
// import PopularSearch from '@/components/search/PopularSearch';
// import RecentSearch from '@/components/search/RecentSearch';

export default function Search() {
  return (
    <div className="flex flex-col">
      <div className="py-4">
        <InputItem />
      </div>
      {/* <div className="py-4">
        {searchDatas.length > 0 ? (
          <RecentSearch searchDatas={searchDatas} />
        ) : (
          <NoSearchData />
        )}
      </div>
      <div className="py-4">
        <PopularSearch popularDatas={popularDatas} />
      </div> */}
    </div>
  );
}

import InputItem from '@/components/search/InputItem';
// import NoSearchData from '@/components/search/NoSearchData';
// import PopularSearch from '@/components/search/PopularSearch';
// import RecentSearch from '@/components/search/RecentSearch';

const searchDatas = [
  {
    id: '1a1a1a',
    name: '애플',
    subname: 'AAPL',
    date: '2024-06-25T04:30:00.000Z',
    iscompleted: true,
  },
  {
    id: '2b2b2b',
    name: '테슬라',
    subname: 'TESL',
    date: '2024-06-25T04:30:00.000Z',
    iscompleted: true,
  },
  {
    id: '3c3c3c',
    name: '마이크로소프트',
    subname: 'MCSF',
    date: '2024-06-26T04:30:00.000Z',
    iscompleted: true,
  },
];

export default function Search() {
  return (
    <div className="flex flex-col">
      <div className="py-4">
        <InputItem searchDatas={searchDatas} />
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

import InputItem from '@/components/search/InputItem';
import NoSearchData from '@/components/search/NoSearchData';
import PopularSearch from '@/components/search/PopularSearch';
import RecentSearch from '@/components/search/RecentSearch';

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

const popularDatas = [
  {
    id: '1a1a1a',
    name: '애플1',
    subname: 'AAPL',
    date: '2024-06-25T04:30:00.000Z',
  },
  {
    id: '2b2b2b',
    name: '테슬라',
    subname: 'AAPL',
    date: '2024-06-25T04:30:00.000Z',
  },
  {
    id: '3b3b3b',
    name: '마이크로소프트',
    subname: 'AAPL',
    date: '2024-06-25T04:30:00.000Z',
  },
  {
    id: '4d4d4d',
    name: '삼성전자',
    subname: 'AAPL',
    date: '2024-06-25T04:30:00.000Z',
  },
  {
    id: '5e5e5e',
    name: '아마존',
    subname: 'AAPL',
    date: '2024-06-25T04:30:00.000Z',
  },
  {
    id: '6f6f6f',
    name: '애플',
    subname: 'AAPL',
    date: '2024-06-25T04:30:00.000Z',
  },
  {
    id: '7g7g7g',
    name: '엔비디아',
    subname: 'AAPL',
    date: '2024-06-25T04:30:00.000Z',
  },
  {
    id: '8h8h8h',
    name: 'LG',
    subname: 'AAPL',
    date: '2024-06-25T04:30:00.000Z',
  },
  {
    id: '9i9i9i',
    name: 'SK 하이닉스',
    subname: 'AAPL',
    date: '2024-06-25T04:30:00.000Z',
  },
  {
    id: '10j10j10j',
    name: 'AMD',
    subname: 'AAPL',
    date: '2024-06-25T04:30:00.000Z',
  },
];

export default function Search() {
  return (
    <div className="flex flex-col">
      <div className="py-4">
        <InputItem />
      </div>
      <div className="py-4">
        {searchDatas.length > 0 ? (
          <RecentSearch searchDatas={searchDatas} />
        ) : (
          <NoSearchData />
        )}
      </div>
      <div className="py-4">
        <PopularSearch popularDatas={popularDatas} />
      </div>
    </div>
  );
}

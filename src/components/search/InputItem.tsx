'use client';
import { useState } from 'react';
import FindStock from './FindStock';
import RecentSearch from './RecentSearch';
import PopularSearch from './PopularSearch';
import NoSearchData from './NoSearchData';

export type popularProps = {
  id: string;
  name: string;
  subname: string;
  date: string;
};

export type searchDatasProps = {
  id?: string;
  name?: string;
  subname?: string;
  date?: string;
  iscompleted?: boolean;
  path?: string;
};

export default function InputItem({
  searchDatas,
  popularDatas,
}: {
  searchDatas: searchDatasProps[];
  popularDatas: popularProps[];
}) {
  const [text, setText] = useState('');

  return (
    <div className="">
      <input
        type="text"
        placeholder="종목을 검색해주세요"
        className="w-[590px] h-14 rounded-lg py-4 px-11 border-2 border-grayscale-300 bg-grayscale-0 focus:scale-105"
        onChange={(e) => {
          setText(e.target.value);
        }}
      />

      {text.trim().length > 0 ? (
        <FindStock searchText={text} />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

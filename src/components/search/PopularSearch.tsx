import Wrapper from '../shared/Wrapper';
import { popularProps } from './InputItem';
import PopularItem from './PopularItem';
import SearchHeading from './SearchHeading';

export default function PopularSearch({
  popularDatas,
}: {
  popularDatas: popularProps[];
}) {
  return (
    <>
      <div className="w-[590px]">
        <div className="flex items-center">
          <SearchHeading> 인기 검색어</SearchHeading>
          <span className="text-sm px-4 underline text-grayscale-600 font-medium">
            00:00 기준
          </span>
        </div>
        <Wrapper width="590px" padding="p-6">
          <div className="w-[542px]  flex justify-center">
            <div className="w-[263px] flex justify-start flex-col">
              {popularDatas &&
                popularDatas.map((popularData, idx) => {
                  if (idx < 5) {
                    return (
                      <PopularItem
                        popularData={popularData}
                        idx={idx}
                        key={popularData.id}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
            </div>
            <div className="w-[263px] flex justify-start flex-col">
              {popularDatas &&
                popularDatas.map((popularData, idx) => {
                  if (idx >= 5) {
                    return (
                      <PopularItem
                        popularData={popularData}
                        idx={idx}
                        key={popularData.id}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
}

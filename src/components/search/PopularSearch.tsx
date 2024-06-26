import Wrapper from '../shared/Wrapper';
import PopularItem from './PopularItem';

export type popularProps = {
  id: string;
  name: string;
  subname: string;
  date: string;
};

export default function PopularSearch({
  popularDatas,
}: {
  popularDatas: popularProps[];
}) {
  return (
    <>
      <div className="w-[590px]">
        <div className="flex items-center">
          <div className="min-w-[110px] b1 font-bold text-primary-900 my-2">
            인기 검색어
          </div>
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

import Exclamation from '@/assets/icons/exclamation.svg';

export default function NoData() {
  return (
    <>
      <div className="flex flex-col">
        <div className="items-center justify-center flex">
          <Exclamation />
        </div>
        <div className="b1 font-medium mt-3">
          최근 조회한 목록이 없습니다.
        </div>
      </div>
    </>
  );
}

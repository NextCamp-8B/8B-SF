import Exclamation from '@/assets/icons/exclamation.svg';

export default function NotFind({
  type,
}: {
  type: 'stock' | 'news';
}) {
  const comment = () => {
    if (type === 'stock') {
      return '해당하는 종목이 없습니다';
    }
    if (type === 'news') {
      return '해당 종목의 뉴스 정보가 없습니다.';
    }
  };

  return (
    <>
      <div className="flex flex-col ">
        <div className="items-center justify-center flex">
          <Exclamation />
        </div>
        <div className="b1 font-medium mt-3 flex justify-center">
          {comment()}
        </div>
      </div>
    </>
  );
}

import ButtonBase from '../shared/buttons/ButtonBase';

export default function ThatGoAddInterest() {
  const name = '최석호';

  return (
    <div className="flex justify-between">
      <h2 className="h4 font-semibold text-primary-900">
        <span>{name}</span>님의 관심종목
      </h2>
      <ButtonBase
        className={`b5 font-normal px-14 
        py-2 rounded-lg min-w-[189px] hover:bg-opacity-90 
        active:bg-opacity-95 text-grayscale-0 bg-primary-900 
        hover:opacity-90 active:opacity-95`}
      >
        관심종목 추가
      </ButtonBase>
    </div>
  );
}

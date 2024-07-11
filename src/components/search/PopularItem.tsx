import { stocksProps } from './InputItem';
import SearchLabel from './SearchLabel';

export default function PopularItem({
  popularData,
  idx,
}: {
  popularData: stocksProps;
  idx: number;
}) {
  return (
    <>
      <div className="py-1 flex">
        <span className="b4 font-medium text-primary-900 align-middle cursor-default">
          {idx + 1}
        </span>
        <SearchLabel data={popularData} />
      </div>
    </>
  );
}

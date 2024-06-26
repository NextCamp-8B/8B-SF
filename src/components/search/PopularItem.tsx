import { popularProps } from './PopularSearch';
import Link from 'next/link';

export default function PopularItem({
  popularData,
  idx,
}: {
  popularData: popularProps;
  idx: number;
}) {
  return (
    <>
      <div className="py-1">
        <span className="b4 font-medium text-primary-900 align-middle cursor-default">
          {idx + 1}
        </span>
        <Link href={`/stock/${popularData.id}`}>
          <span className="b4 font-medium text-grayscale-600 px-4 cursor-pointer hover:underline">
            {popularData.name}
          </span>
        </Link>
      </div>
    </>
  );
}

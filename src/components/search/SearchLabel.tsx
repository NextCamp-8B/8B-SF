'use client';

import Link from 'next/link';
import { stocksProps } from './InputItem';

export default function SearchLabel({ data }: { data: stocksProps }) {
  return (
    <>
      <Link href={`/stock/${data.stock_id}`}>
        <p className="text-overflow-1 px-2 hover:underline cursor-pointer">
          {data && data.stock_name}
        </p>
      </Link>
      {/* <p className="b5 text-grayscale-400 flex items-center px-1">
        {data.stock_code}
      </p> */}
    </>
  );
}

import React from 'react';
import StockIcon from './StockIcon';
import { Stock } from '@/types/stock';
import Link from 'next/link';

export type StockListItemProps = {
  stock: Stock;
  type?: 'find' | 'default';
};

export default function StockListItem({
  stock,
  type = 'default',
}: StockListItemProps) {
  const {
    stock_id,
    stock_name,
    stock_code,
    logo_path,
    fluctuations_ratio,
    price,
    compare_to_previous_close_price: cp,
  } = stock;
  return (
    <Link
      href={`/stock/${stock_id}`}
      className="py-2 flex text-grayscale-900 gap-4 items-center cursor-pointer group"
    >
      <StockIcon
        size={type === 'find' ? 'small' : 'medium'}
        path={logo_path}
      />
      <div className="flex-1 flex justify-between">
        <div className="flex flex-col">
          <span
            className={`${type === 'find' && 'b4'} ${
              type === 'default' && 'b2'
            }  font-bold group-hover:underline`}
          >
            {stock_name}
          </span>
          <span className="b5 font-normal ">{stock_code}</span>
        </div>
        <div className="flex flex-col">
          <span
            className={`text-right ${
              type === 'find' && 'b5 font-medium'
            } ${type === 'default' && 'b3 font-medium'}`}
          >
            ${price}
          </span>
          <div
            className={`flex gap-2 
              ${
                fluctuations_ratio > 0
                  ? 'text-warning-100'
                  : fluctuations_ratio === 0
                  ? ''
                  : 'text-secondary-600'
              }
              ${type === 'find' && 'caption'} ${
              type === 'default' && 'b4 font-normal'
            }`}
          >
            <span>{`${cp > 0 ? '▲' : cp === 0 ? '' : '▼'}${Math.abs(
              cp,
            ).toFixed(2)}`}</span>
            <span>{(fluctuations_ratio * 100).toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

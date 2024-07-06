import React from 'react';
import StockIcon from './StockIcon';
import { Stock } from '@/types/stock';
import Link from 'next/link';

export type StockListItemProps = {
  stock: Stock;
  type?: 'related' | 'find' | 'default';
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
    <>
      {type === 'default' && (
        <Link
          href={`/stock/${stock_id}`}
          className="py-2 flex text-grayscale-900 gap-4 items-center cursor-pointer group"
        >
          <StockIcon size="medium" path={logo_path} />
          <div className="flex-1 flex justify-between">
            <div className="flex flex-col">
              <span className={`b2 font-bold group-hover:underline`}>
                {stock_name}
              </span>
              <span className="b5 font-normal ">{stock_code}</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-right b3 font-medium`}>
                ${price}
              </span>
              <div
                className={`flex gap-2 b4 font-normal
              ${
                fluctuations_ratio > 0
                  ? 'text-warning-100'
                  : fluctuations_ratio === 0
                  ? ''
                  : 'text-secondary-600'
              }
              `}
              >
                <span>{`${
                  cp > 0 ? '▲' : cp === 0 ? '' : '▼'
                }${Math.abs(cp).toFixed(2)}`}</span>
                <span>
                  {fluctuations_ratio > 0 && '+'}
                  {(fluctuations_ratio * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}
      {type === 'find' && (
        <Link
          href={`/stock/${stock_id}`}
          className="py-2 flex text-grayscale-900 gap-4 items-center cursor-pointer group"
        >
          <StockIcon size={'small'} path={logo_path} />
          <div className="flex-1 flex justify-between">
            <div className="flex flex-col">
              <span className={`b4 font-bold group-hover:underline`}>
                {stock_name}
              </span>
              <span className="b5 font-normal ">{stock_code}</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-right b5 font-medium`}>
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
              caption`}
              >
                <span>{`${
                  cp > 0 ? '▲' : cp === 0 ? '' : '▼'
                }${Math.abs(cp).toFixed(2)}`}</span>
                <span>
                  {fluctuations_ratio > 0 && '+'}
                  {(fluctuations_ratio * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}
      {type === 'related' && (
        <div className="w-full">
          <div className="flex items-center gap-2">
            <StockIcon path={logo_path} size="small" />
            <div className="flex gap-2 items-center">
              <span className="b1 font-bold">{stock_name}</span>
              <span className="b3 font-normal">{stock_code}</span>
            </div>
          </div>
          <div
            className={`flex gap-2 
              ${
                fluctuations_ratio > 0
                  ? 'text-warning-100'
                  : fluctuations_ratio === 0
                  ? ''
                  : 'text-secondary-600'
              }
              caption`}
          >
            <span className={`b4 font-medium text-grayscale-900`}>
              ${price}
            </span>
            <span className={`b4 font-normal`}>{`${
              cp > 0 ? '▲' : cp === 0 ? '' : '▼'
            }${Math.abs(cp).toFixed(2)}`}</span>
            <span className={`b4 font-normal`}>
              {fluctuations_ratio > 0 && '+'}
              {(fluctuations_ratio * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      )}
    </>
  );
}

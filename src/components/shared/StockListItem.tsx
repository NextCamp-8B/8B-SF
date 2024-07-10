import React from 'react';
import StockIcon from './StockIcon';
import { Stock } from '@/types/stock';
import Link from 'next/link';
import { compareToZero, formattingPrice } from '@/utils/stock';

export type StockListItemProps = {
  stock: Stock;
  type?: 'related' | 'find' | 'default' | 'report' | 'description';
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

  const compare = compareToZero(cp);

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
                ${formattingPrice(price)}
              </span>
              <div
                className={`flex gap-2 b4 font-normal
              ${
                compare === 'up'
                  ? 'text-warning-100'
                  : compare === 'equal'
                  ? ''
                  : 'text-secondary-600'
              }
              `}
              >
                <span>{`${
                  compare === 'up'
                    ? '▲'
                    : compare === 'equal'
                    ? ''
                    : '▼'
                }${Math.abs(cp).toFixed(2)}`}</span>
                <span>
                  {compare === 'up' && '+'}
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
                ${formattingPrice(price)}
              </span>
              <div
                className={`flex gap-2 
              ${
                compare === 'up'
                  ? 'text-warning-100'
                  : compare === 'equal'
                  ? ''
                  : 'text-secondary-600'
              }
              caption`}
              >
                <span>{`${
                  compare === 'up'
                    ? '▲'
                    : compare === 'equal'
                    ? ''
                    : '▼'
                }${Math.abs(cp).toFixed(2)}`}</span>
                <span>
                  {compare === 'up' && '+'}
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
                compare === 'up'
                  ? 'text-warning-100'
                  : compare === 'equal'
                  ? ''
                  : 'text-secondary-600'
              }
              caption`}
          >
            <span className={`b4 font-medium text-grayscale-900`}>
              ${formattingPrice(price)}
            </span>
            <span className={`b4 font-normal`}>{`${
              compare === 'up' ? '▲' : compare === 'equal' ? '' : '▼'
            }${Math.abs(cp).toFixed(2)}`}</span>
            <span className={`b4 font-normal`}>
              {compare === 'up' && '+'}
              {(fluctuations_ratio * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      )}
      {type === 'report' && (
        <div className="flex items-center gap-2">
          <div className="flex gap-1 items-center">
            <StockIcon path={logo_path} size="small" />
            <span className="b3 font-medium">{stock_name}</span>
            <span className="b2">∙</span>
            <span className="b3">{stock_code}</span>
          </div>
          <span className="b4 font-medium">
            ${formattingPrice(price)}
          </span>
          <div
            className={`flex h-full items-center gap-2 ${
              compare === 'up'
                ? 'text-warning-100'
                : compare === 'equal'
                ? ''
                : 'text-secondary-600'
            }`}
          >
            <span className="b4">{`${
              compare === 'up' ? '▲' : compare === 'equal' ? '' : '▼'
            }${Math.abs(cp).toFixed(2)}`}</span>
            <span className={`b4 `}>
              {compare === 'up' && '+'}
              {(fluctuations_ratio * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      )}
      {type === 'description' && (
        <div>
          <div className="text-primary-900 flex items-center gap-1">
            <span className="b1 font-bold">
              ${formattingPrice(price)}
            </span>
            <span className="b1 font-bold">∙</span>
            <span className="b2">{stock_code}</span>
          </div>
          <div
            className={`b2 font-medium flex items-center gap-2 ${
              compare === 'up'
                ? 'text-warning-100'
                : compare === 'equal'
                ? ''
                : 'text-secondary-600'
            }`}
          >
            <span>{`${
              compare === 'up' ? '▲' : compare === 'equal' ? '' : '▼'
            }${Math.abs(cp).toFixed(2)}`}</span>
            <span>
              {compare === 'up' && '+'}
              {(fluctuations_ratio * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      )}
    </>
  );
}

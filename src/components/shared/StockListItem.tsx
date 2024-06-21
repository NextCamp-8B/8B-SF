import React from 'react';
import StockIcon from './StockIcon';

interface StockListItemProps {
  icon: React.ReactNode;
  stock: Stock;
  type?: 'find' | 'default';
}

interface Stock {
  name: string;
  subname: string;
  value: string;
  tmp1: number;
  tmp2: number;
}

export default function StockListItem({
  icon,
  stock,
  type = 'default',
}: StockListItemProps) {
  const { name, subname, value, tmp1, tmp2 } = stock;
  return (
    <div className="py-2 flex text-grayscale-900 gap-4 items-center">
      <StockIcon size={type === 'find' ? 'small' : 'medium'}>
        {icon}
      </StockIcon>
      <div className="flex-1 flex justify-between">
        <div className="flex flex-col">
          <span
            className={`${type === 'find' && 'b4'} ${
              type === 'default' && 'b2'
            }  font-bold`}
          >
            {name}
          </span>
          <span className="b5 font-normal ">{subname}</span>
        </div>
        <div className="flex flex-col">
          <span
            className={`text-right ${
              type === 'find' && 'b5 font-medium'
            } ${type === 'default' && 'b3 font-medium'}`}
          >
            ${value}
          </span>
          <div
            className={`text-warning-100 flex gap-2 ${
              type === 'find' && 'caption'
            } ${type === 'default' && 'b4 font-normal'}`}
          >
            <span>▲{tmp1}</span>
            <span>{tmp2}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

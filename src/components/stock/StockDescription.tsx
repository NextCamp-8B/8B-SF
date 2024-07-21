import { getExchangePrice, getStockStyle } from '@/utils/stock';
import React, { useEffect, useState } from 'react';
import ToggleButton from '../shared/ToggleButton';
import { useLocale } from 'next-intl';
import { businessAPI } from '@/service/apiInstance';
import { Locale } from '@/types/next-auth';
import { StockWithInterest } from '@/service/serviceType';

type ExchangeRate = {
  locale: Locale;
  exchange_rate: number;
};

export default function StockDescription({
  stock,
  language = 'en',
}: {
  stock: StockWithInterest;
  language: string;
}) {
  const { comparePrice, ratio } = getStockStyle(
    stock?.compare_to_previous_close_price,
    stock?.fluctuations_ratio,
  );

  const stockDesc = stock[`description_${language}`];
  const locale = useLocale() as Locale;
  const [isDollar, setIsDollar] = useState(true);
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate[]>();

  const getExchangeRate = async () => {
    const data = await businessAPI.getExchangeRate();
    setExchangeRate(data);
  };

  useEffect(() => {
    getExchangeRate();

    const intervalId = setInterval(() => {
      getExchangeRate();
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="flex justify-between mb-8">
        <div>
          <div className="flex items-center gap-[2px]">
            <span className="b1 font-bold text-primary-900">
              {isDollar
                ? exchangeRate &&
                  getExchangePrice(
                    exchangeRate.find((e) => e.locale === 'en')!
                      .exchange_rate,
                    exchangeRate.find((e) => e.locale === 'en')!
                      .exchange_rate,
                    stock.price,
                    'en',
                  )
                : exchangeRate &&
                  getExchangePrice(
                    exchangeRate.find((e) => e.locale === 'en')!
                      .exchange_rate,
                    exchangeRate.find((e) => e.locale === locale)!
                      .exchange_rate,
                    stock.price,
                    locale,
                  )}
            </span>
            <span className="b2 font-normal text-primary-900">∙</span>
            <span className="b2 font-normal text-primary-900">
              {stock.stock_code}
            </span>
          </div>
          <span
            className={`b2 font-medium ${
              stock &&
              getStockStyle(
                stock?.compare_to_previous_close_price,
                stock?.fluctuations_ratio,
              ).color
            }`}
          >
            {comparePrice !== 'NaN' && ratio !== 'NaN'
              ? `
              ${comparePrice}
              ${ratio}
            `
              : '0.00 0.00%'}
          </span>
        </div>
        {/* Toggle Button */}
        <ToggleButton
          isDollar={isDollar}
          setIsDollar={setIsDollar}
          locale={locale}
        />
      </div>
      <p className="b4 font-normal text-grayscale-900">{stockDesc}</p>
    </>
  );
}

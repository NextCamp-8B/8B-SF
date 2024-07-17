import InputItem from '@/components/search/InputItem';
import IntlClientProvider from '@/components/shared/IntlClientProvider';

export default function Search() {
  return (
    <div className="flex flex-col">
      <div className="py-4">
        <IntlClientProvider>
          <InputItem />
        </IntlClientProvider>
      </div>
    </div>
  );
}

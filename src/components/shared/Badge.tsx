import AI from '@/assets/icons/ai.svg';

interface Badge {
  direction: 'left' | 'right';
  type: 'light' | 'secondary' | 'primary';
}

export default function Badge({ direction, type }: Badge) {
  return (
    <div
      className={`w-[55px] h-[32px] flex rounded items-center justify-center gap-1
        ${type === 'primary' && 'bg-primary-900 text-grayscale-0'}
        ${type === 'light' && 'bg-background-100 text-grayscale-900'}
        ${
          type === 'secondary' && 'bg-secondary-50 text-secondary-900'
        }
        `}
    >
      {direction === 'left' && <AI className="w-5 h-5" />}
      <span className="b4 font-medium">AI</span>
      {direction === 'right' && <AI className="w-5 h-5" />}
    </div>
  );
}

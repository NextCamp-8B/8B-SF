import { useState } from 'react';

type TermsBoxProps = {
  title: string;
  content: string;
};

export default function TermsBox({ title, content }: TermsBoxProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex justify-between mb-10">
      <div className="flex flex-col gap-y-2 mb-4">
        <div className="flex justify-between">
          <h2 className="b2 font-bold mb-4 text-primary-900">
            {title}
          </h2>
          <span
            onClick={() => setIsExpanded(!isExpanded)}
            className="cursor-pointer text-secondary-600 underline"
          >
            {isExpanded ? '닫기' : '펼쳐서 보기'}
          </span>
        </div>
        <div
          className={`w-[800px] border-box ${
            isExpanded ? 'h-auto' : 'h-[250px]'
          } flex flex-col gap-y-6 border border-grayscale-300 rounded-lg overflow-y-auto p-4 b4`}
        >
          <pre className="h-full p-4">{content}</pre>
        </div>
      </div>
    </div>
  );
}

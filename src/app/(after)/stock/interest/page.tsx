import RequestWrapper from '@/components/stock/RequestWrapper';

/**
 * @description
 *  - 반응형 대응 전까지 1214px 고정
 *  - API 작업 전까지 임시 데이터 사용
 */
export default function Interest() {
  return (
    <div className="w-full max-w-[1214px] min-w-[1214px] flex flex-col gap-6">
      <RequestWrapper />
    </div>
  );
}

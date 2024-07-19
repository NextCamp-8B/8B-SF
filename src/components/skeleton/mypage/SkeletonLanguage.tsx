import SectionBox from '@/components/user/SectionBox';
import SkeletonText from '../shared/SkeletonText';
import { useTranslations } from 'next-intl';

export default function SkeletonLanguageSection() {
  const t = useTranslations('MyPage');
  return (
    <>
      <SectionBox
        title={t('languages')}
        description={t('languages_content')}
      />
      <div className="flex gap-4 flex-wrap">
        <SkeletonText
          type="h2"
          className="w-[198px] h-40 rounded-2xl px-16"
        />
        <SkeletonText
          type="h2"
          className="w-[198px] h-40 rounded-2xl px-16"
        />
        <SkeletonText
          type="h2"
          className="w-[198px] h-40 rounded-2xl px-16"
        />
        <SkeletonText
          type="h2"
          className="w-[198px] h-40 rounded-2xl px-16"
        />
        <SkeletonText
          type="h2"
          className="w-[198px] h-40 rounded-2xl px-16"
        />
      </div>
    </>
  );
}

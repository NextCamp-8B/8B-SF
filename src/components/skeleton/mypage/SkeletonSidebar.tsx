import Wrapper from '@/components/shared/Wrapper';
import SidebarItem from '@/components/user/SidebarItem';
import SkeletonText from '../shared/SkeletonText';

export default function SkeletonSidebar() {
  return (
    <>
      <Wrapper padding="px-6 py-8" width="w-[285px]">
        <div className="h-full pr-4 w-64">
          <ul className="space-y-8 text-primary-900 b2 font-medium">
            <SkeletonText type="b2" className="w-44" />
            <SkeletonText type="b2" className="w-44" />
            <SkeletonText type="b2" className="w-44" />
          </ul>
        </div>
      </Wrapper>
    </>
  );
}

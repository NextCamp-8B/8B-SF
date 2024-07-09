import SectionBox from '@/components/user/SectionBox';
import MyPageSection from '@/components/user/MyPageSection';
import SkeletonIcon from '../shared/SkeletonIcon';
import SkeletonText from '../shared/SkeletonText';

export default function SkeletonProfileSection({}) {
  return (
    <>
      <MyPageSection>
        <SectionBox
          title="프로필 설정"
          description="서비스 사용시 보여지는 프로필을 생성 및 변경합니다. 프로필을 설정해보세요."
        ></SectionBox>

        <div className="flex gap-x-32">
          <h3 className="b3 font-semibold">프로필 선택</h3>
          <div className="flex items-center justify-between  gap-x-4">
            <SkeletonIcon type="small" />
            <SkeletonText type="b3" className="w-24" />
          </div>
        </div>
      </MyPageSection>

      <MyPageSection className="mt-14">
        <SectionBox
          title="계정 설정"
          description="서비스 이용시 사용하는 계정을 생성 및 변경합니다. 계정을 인증하여 다양한 서비스를 이용해보세요."
        ></SectionBox>
        <div className="flex flex-col gap-y-4">
          <div className="flex gap-x-24 items-center">
            <SkeletonText type="b1" className="w-32" />
            <SkeletonText type="b3" className="w-40" />
          </div>
          <div className="flex gap-x-24">
            <SkeletonText type="b1" className="w-32" />
            <SkeletonText type="b3" className="w-40" />
          </div>
          <div className="flex gap-x-24">
            <SkeletonText type="b1" className="w-32" />
            <SkeletonText type="b3" className="w-40" />
          </div>
        </div>
      </MyPageSection>
    </>
  );
}

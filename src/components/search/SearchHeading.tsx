// Search Page의 각 컴포넌트 이름

type SearchHeadingProps = {
  children: React.ReactNode;
};

export default function SearchHeading({
  children,
}: SearchHeadingProps) {
  return (
    <>
      <div className="flex items-center justify-between min-w-[58px] b1 font-bold text-primary-900 my-2">
        {children}
      </div>
    </>
  );
}

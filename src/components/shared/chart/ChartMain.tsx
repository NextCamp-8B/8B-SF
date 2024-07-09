import Wrapper from '../Wrapper';

export default function ChartMain({
  children,
  width = '',
}: {
  children: React.ReactNode;
  width?: string;
}) {
  return (
    <Wrapper width={width} padding="px-8 pt-8">
      {children}
    </Wrapper>
  );
}

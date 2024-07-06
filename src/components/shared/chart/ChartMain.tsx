import Wrapper from '../Wrapper';

export default function ChartMain({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Wrapper padding="px-8 pt-8">{children}</Wrapper>;
}

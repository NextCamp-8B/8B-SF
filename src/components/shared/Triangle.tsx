export default function Triangle({ rate }: { rate: boolean }) {
  const rotate = rate ? 'rotate-0' : 'rotate-180';
  return (
    <div
      className={`triangle ${rotate} ${
        rate ? 'text-warning-100' : 'text-secondary-600'
      }`}
    />
  );
}

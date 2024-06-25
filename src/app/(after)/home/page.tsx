import Recent from './Recent/Recent';
const tmpStock = [
  {
    name: '애플1',
    subname: 'AAPL',
    value: '00.00',
    tmp1: 0.82,
    tmp2: 1.75,
  },
  {
    name: '애플2',
    subname: 'AAPL',
    value: '01.00',
    tmp1: -0.72,
    tmp2: 1.75,
  },
  {
    name: '애플3',
    subname: 'AAPL',
    value: '02.00',
    tmp1: -0.62,
    tmp2: 1.75,
  },
  {
    name: '애플4',
    subname: 'AAPL',
    value: '03.00',
    tmp1: -0.52,
    tmp2: 1.75,
  },
];
export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <h1>Home Component</h1>
        <div className="w-[1200px]  flex">
          <Recent data={tmpStock} />
        </div>
      </div>
    </>
  );
}

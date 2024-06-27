import Link from 'next/link';

// Search Page 주식 이름 출력

type dataProps = {
  id: string;
  name: string;
  subname: string;
  date: string;
};

export default function SearchLabel({ data }: { data: dataProps }) {
  return (
    <>
      <Link href={`/stock/${data.id}`}>
        <p className="text-overflow-1 px-2 hover:underline cursor-pointer">
          {data.name}
        </p>
      </Link>
      {/* <p className="b5 text-grayscale-400 flex items-center px-1">
        {data.subname}
      </p> */}
    </>
  );
}

type MyPageSection = {
  children: React.ReactNode;
  className?: string;
};

export default function MyPageSection({
  children,
  className = '',
}: MyPageSection) {
  return (
    <>
      <section className={`flex flex-col ${className}`}>
        {children}
      </section>
    </>
  );
}

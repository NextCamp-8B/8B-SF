export default function BeforeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`w-full min-h-dvh bg-background-100 pt-32 pb-20 px-14 text-grayscale-900 flex justify-center`}
    >
      {children}
    </div>
  );
}

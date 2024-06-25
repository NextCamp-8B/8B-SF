import LightLogo from '@/assets/logos/logo_light.svg';

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className=" h-20 flex justify-center fixed w-full">
        <div className="min-w-[1200px] w-full flex items-center">
          <LightLogo />
        </div>
      </header>
      {children}
    </>
  );
}

export const Header = () => {
  return (
    <header className="w-full bg-gradient-to-r from-[#16203d] to-[#1f2b52] px-6 py-5 shadow-xl">
      <div className="flex flex-col gap-1 text-center sm:text-left">
        <h1 className="text-lg font-bold text-white sm:text-2xl">
          Gerador de Assinatura de Email
        </h1>

        <p className="text-sm text-white/70">
          Crie, personalize e baixe sua assinatura profissional.
        </p>
      </div>
    </header>
  );
};

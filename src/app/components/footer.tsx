export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-10 bg-gray-200 h-16 w-full flex justify-center items-center">
      <p className="text-sm text-gray-800 m-0">
        Copyright © Unicargo 2025 - {currentYear}. Todos os direitos reservados.
      </p>
    </footer>
  );
};

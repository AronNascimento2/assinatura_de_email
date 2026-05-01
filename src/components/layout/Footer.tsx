export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-200 h-14 w-full flex justify-center items-center">
      <p
        className="text-sm text-gray-800 m-0 font"
        style={{ fontFamily: "Alexandria" }}
      >
        Copyright © Aron Nascimento 2025 - {currentYear}. Todos os direitos
        reservados.
      </p>
    </footer>
  );
};

import { Header } from "./Header";
import { Footer } from "./Footer";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen  bg-gray-50 flex flex-col">
      {/* Header FULL WIDTH */}
      <Header />

      {/* Conteúdo central limitado */}
      <main className="flex-1 w-full ">
        <div className="w-full px-4 py-8 sm:px-6 lg:px-8 justify-center items-center flex">
          {" "}
          {children}
        </div>
      </main>

      {/* Footer FULL WIDTH */}
      <Footer />
    </div>
  );
};

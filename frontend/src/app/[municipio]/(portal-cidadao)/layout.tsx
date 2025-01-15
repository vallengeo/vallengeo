import { Footer } from "./components/footer";
import { Header } from "./components/header";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { municipio: string };
}) {
  return (
    <div className="h-screen flex flex-col">
      <Header municipio={params.municipio} />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}

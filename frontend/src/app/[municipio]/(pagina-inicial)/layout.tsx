"use client";

import { Sidebar } from "@/app/[municipio]/(pagina-inicial)/components/sidebar";
import { Footer } from "./components/footer";
import { SplashScreen } from "@/components/splash-screen";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { municipio: string };
}) {
  const pathname = usePathname();
  const canShowSplashScreen =
    typeof window !== "undefined" &&
    pathname === `/${params.municipio}/dashboard` &&
    localStorage.getItem("animateSplayScreen") !== null &&
    JSON.parse(localStorage.getItem("animateSplayScreen") || "false");

  const [isLoading, setIsLoading] = useState<boolean>(canShowSplashScreen);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    if (canShowSplashScreen) {
      document.querySelector("body")?.classList.add("overflow-hidden");
      const timeout = setTimeout(() => {
        setIsAnimating(true);

        setTimeout(() => {
          localStorage.removeItem("animateSplayScreen");

          document.querySelector("body")?.classList.remove("overflow-hidden");
          setIsLoading(false);
        }, 1000);
      }, 6000);

      return () => clearTimeout(timeout);
    }
  }, [canShowSplashScreen]);

  return (
    <div className="container flex gap-0 lg:gap-6 flex-col lg:flex-row h-full">
      {isLoading && canShowSplashScreen && (
        <SplashScreen isAnimating={isAnimating} />
      )}

      <aside className="sticky top-0 z-0 h-screen py-6 hidden lg:block">
        <Sidebar municipio={params.municipio} />
      </aside>

      <div className="flex-1 flex flex-col py-6">
        <main>{children}</main>

        <Footer />
      </div>
    </div>
  );
}

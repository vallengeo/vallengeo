import entrada from "@/assets/images/prefeitura/museu.webp";

export function CityBackdrop() {
  return (
    <div
      style={{ backgroundImage: "url(" + entrada.src + ")" }}
      className="h-full w-full bg-cover bg-center bg-no-repeat"
    />
  );
}

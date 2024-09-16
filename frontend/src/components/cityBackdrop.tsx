import cityBackdrop from '@/assets/images/prefeitura/city-backdrop.jpg';

export function CityBackdrop() {
  return (
    <div
      style={{backgroundImage: "url(" + cityBackdrop.src + ")"}}
      className="h-full w-full bg-cover bg-center bg-no-repeat"
    />
  )
}

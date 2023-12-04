import Brasao from "./brasao";

interface HeaderProps {
  title: string;
  description?: React.ReactNode;
}

export default function Header({
  title = '',
  description
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col">
        <h1 className="text-[2rem]">{title}</h1>
        {description}
      </div>

      <Brasao/>
    </header>
  )
}
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Página não encontrada | 404'
}

export default function NotFound() {
  return (
    <div className="bg-primary-foreground text-white h-screen flex items-center justify-center gap-4">
      <h1 className="font-bold text-2xl">404</h1>
      <div className="w-px h-10 bg-white" />
      <p className="text-sm">A página não pode ser encontrada.</p>
    </div>
  )
}

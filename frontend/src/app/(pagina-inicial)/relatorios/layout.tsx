'use client'

import { MenuProvider } from "@/contexts/MenuContext"

export default function RelatoriosLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <MenuProvider>
      {children}
    </MenuProvider>
  )
}
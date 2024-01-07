'use client'

import { MenuProvider } from "@/contexts/MenuContext"

export default function ImovelLayout({
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
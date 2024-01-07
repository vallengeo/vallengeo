'use client'

import { MenuProvider } from "@/contexts/MenuContext"

export default function HomeLayout({
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
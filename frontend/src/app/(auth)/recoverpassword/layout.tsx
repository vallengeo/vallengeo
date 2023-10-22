import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Recuperar senha - VallenGeo"
}

export default function RecoverPasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
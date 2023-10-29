import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Redefinir senha - VallenGeo"
}

export default function ResetLayout({
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
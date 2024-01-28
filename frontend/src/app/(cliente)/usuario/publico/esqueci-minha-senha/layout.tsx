import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Esqueceu a senha - VallenGeo',
}

export default function ForgotPasswordLayout({
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
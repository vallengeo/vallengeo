import { Metadata } from "next";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: 'Protocolos - VallenGeo',
}

export default function ProtocolosPage() {
  return (
    <>
      <Header title="Protocolos" canShowBrasao />
    </>
  )
}
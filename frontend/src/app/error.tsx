'use client'

import { Button } from "@/components/ui/button"
import { Support } from "@/components/support"
import { Logo } from "@/components/logo"
import { Brasao } from "@/components/brasao"

import { useEffect } from 'react'
import { CityBackdrop } from "@/components/cityBackdrop"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container relative">
      <div className="lg:w-1/2 h-screen flex">
        <div className="w-full max-w-sm m-auto py-6 lg:py-0">
          <main role="main">
            <Logo useBlackLogo />

            <h1 className="text-[2rem]/10 font-bold mt-6">
              Ocorreu um erro
            </h1>

            <p>Infelizmente houve um erro no sistema. Reinicie o processo ou entre em contato com o suporte.</p>

            <div className="flex items-center justify-between mt-4">
              <Button onClick={() => reset()} variant="link">
                Tente novamente
              </Button>
              <Support variant="default" />
            </div>
          </main>

          <div className="mt-12">
            <Brasao className="mx-auto" />
          </div>
        </div>
      </div>
      <div className="absolute w-1/2 inset-0 ml-auto hidden lg:block">
        <CityBackdrop />
      </div>
    </div>
  )
}

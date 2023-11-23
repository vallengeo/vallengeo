'use client'

import { Button } from "@/components/ui/button"

// import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // useEffect(() => {
  //   console.error(error)
  // }, [error])

  return (
    <div className="mt-10">
      <h1 className="font-normal">
        Erro <strong>{error.digest}</strong>
      </h1>
      <p>Infelizmente houve um erro no sistema. Reinicie o processo ou entre em contato com o suporte.</p>

      <div className="flex items-center justify-between mt-4">
        <Button
          onClick={() => reset()}
          variant="link"
        >
          Tente novamente
        </Button>

        <Button variant="default" className="flex-1 h-12">
          <a href="#">
            Suporte
          </a>
        </Button>
      </div>
    </div>
  )
}
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'

export const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
})

export function Legenda() {
    return (
        <div className="leaflet-bottom leaflet-left">
            <div className="leaflet-legend bg-white p-4 min-w-40">
                <div className="pb-2">
                    <h3 className={cn("text-xl font-medium text-title", inter.className)}>Legenda</h3>
                </div>
                <div className="flex items-center gap-3 mt-2 font-light">
                    <div className="rounded w-6 h-6 bg-[#005074]" />
                    <h5 className={cn("text-sm font-normal text-title", inter.className)}>Comercial</h5>
                </div>

                <div className="flex items-center gap-3 mt-2 font-light">
                    <div className="w-6 h-6 rounded bg-[#0EA061]" />
                    <h5 className={cn("text-sm font-normal text-title", inter.className)}>Residencial</h5>

                </div>

                <div className="flex items-center gap-3 mt-2 font-light">
                    <div className="w-6 h-6 rounded bg-[#729397]" />
                    <h5 className={cn("text-sm font-normal text-title", inter.className)}>Misto</h5>
                </div>
            </div>
        </div>
    )
}
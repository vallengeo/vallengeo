import Image from "next/image";
import splashScreen from '@/assets/images/splash-screen.gif';

interface ISplashScreen {
  isAnimating: boolean
}

export function SplashScreen({ isAnimating }: ISplashScreen) {
  return (
    <div className={`fixed inset-0 w-screen z-50 bg-primary-foreground text-white overflow-hidden transition-all duration-1000 ${isAnimating ? 'h-0' : 'h-screen'}`}>
      <div className="h-screen flex items-center justify-center">
        <Image src={splashScreen} alt="Splash Screen" width={381} height={131} />
      </div>
    </div>
  )
}

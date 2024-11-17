import SignInButton from "@/components/SignInButton";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function Landing() {
  return (
    <BackgroundGradientAnimation>
      <div className="absolute z-50 inset-0 flex flex-col text-white font-bold px-4 text-center">
        <div className="flex-1 flex flex-col items-center justify-center">
          <TextGenerateEffect
            duration={0.8}
            words="Vibe Check"
            className="text-3xl md:text-4xl lg:text-7xl drop-shadow-2xl text-[#bbdff3]"
          />

          <p className="mt-6 text-lg md:text-xl lg:text-3xl bg-clip-text text-transparent drop-shadow-xl bg-gradient-to-b from-white/80 to-white/60">
            Your Music, Your Vibe. Let the Crowd Decide.
          </p>
          <SignInButton />
        </div>
        <footer className="px-4 py-6">
          <p className="text-sm font-bold text-stone-300">
            Made with ❤️ by Subham Mani
          </p>
        </footer>
      </div>
    </BackgroundGradientAnimation>
  );
}

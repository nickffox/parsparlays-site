
import bgUrl from '../assets/parsparlays.png'

export default function Home() {
  return (
    <main className="min-h-screen relative bg-neutral-50 text-neutral-900 overflow-hidden">
      {/* Fullscreen background image anchored to top-center and cropped with object-cover */}
      <img
        src={bgUrl}
        alt="Par's Parlays background"
        className="pointer-events-none absolute inset-0 h-screen w-screen object-cover object-top"
      />
    </main>
  );
}
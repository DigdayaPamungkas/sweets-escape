import { useState } from "react";

const FlipLetter = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000 mx-auto" style={{ width: "min(90vw, 420px)", height: "520px" }}>
      <div
        className="relative w-full h-full cursor-pointer preserve-3d transition-transform duration-700"
        style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front side */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl shadow-2xl p-8 flex flex-col justify-between overflow-hidden"
          style={{
            background: "linear-gradient(160deg, hsl(330 80% 95%), hsl(320 60% 92%), hsl(280 50% 93%))",
            border: "2px solid hsl(330 60% 80%)",
          }}
        >
          {/* Decorative corners */}
          <div className="absolute top-3 left-3 text-2xl opacity-50">🌸</div>
          <div className="absolute top-3 right-3 text-2xl opacity-50">🌸</div>
          <div className="absolute bottom-3 left-3 text-2xl opacity-50">💕</div>
          <div className="absolute bottom-3 right-3 text-2xl opacity-50">💕</div>

          <div className="text-center mt-4">
            <p className="font-script text-3xl mb-2" style={{ color: "hsl(330 70% 50%)" }}>
              My Dearest
            </p>
            <p className="font-script text-4xl font-bold" style={{ color: "hsl(280 50% 40%)" }}>
              Dessy Ratu Syahrida
            </p>
          </div>

          <div className="text-center space-y-3 px-2" style={{ color: "hsl(280 30% 30%)" }}>
            <p className="text-sm leading-relaxed">
              Every moment with you feels like a beautiful dream I never want to wake up from. 
              Your smile lights up my darkest days, and your laughter is the sweetest melody I've ever heard.
            </p>
            <p className="text-sm leading-relaxed">
              You are my sunshine, my moonlight, and every star in between. 
              I am so grateful that the universe brought us together. 💖
            </p>
            <p className="font-script text-xl mt-4" style={{ color: "hsl(330 70% 50%)" }}>
              Happy Valentine's Day! 🌹
            </p>
          </div>

          <p className="text-xs text-center opacity-60" style={{ color: "hsl(280 30% 50%)" }}>
            ✨ Tap to see more ✨
          </p>
        </div>

        {/* Back side */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl shadow-2xl p-8 flex flex-col justify-between overflow-hidden rotate-y-180"
          style={{
            background: "linear-gradient(160deg, hsl(280 50% 93%), hsl(300 50% 92%), hsl(330 70% 94%))",
            border: "2px solid hsl(280 50% 75%)",
          }}
        >
          <div className="absolute top-3 left-3 text-2xl opacity-50">✨</div>
          <div className="absolute top-3 right-3 text-2xl opacity-50">✨</div>
          <div className="absolute bottom-3 left-3 text-2xl opacity-50">💗</div>
          <div className="absolute bottom-3 right-3 text-2xl opacity-50">💗</div>

          <div className="text-center mt-4">
            <p className="font-script text-3xl" style={{ color: "hsl(280 50% 45%)" }}>
              A Poem For You
            </p>
          </div>

          <div className="text-center space-y-4 px-2" style={{ color: "hsl(280 30% 30%)" }}>
            <p className="text-sm italic leading-relaxed">
              In a world of billions, I found you,<br />
              A love so pure, a love so true.<br />
              With every heartbeat, I whisper your name,<br />
              Since you came along, nothing's the same.
            </p>
            <p className="text-sm italic leading-relaxed">
              Your eyes hold galaxies I want to explore,<br />
              With each passing day, I love you more.<br />
              You're my today, my tomorrow, my forever,<br />
              My promise to you: I'll leave you never. 💜
            </p>
            <p className="font-script text-xl mt-2" style={{ color: "hsl(330 70% 50%)" }}>
              Forever & Always Yours 💌
            </p>
          </div>

          <p className="text-xs text-center opacity-60" style={{ color: "hsl(280 30% 50%)" }}>
            ✨ Tap to flip back ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlipLetter;

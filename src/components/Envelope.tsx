import { useState } from "react";

interface EnvelopeProps {
  onOpen: () => void;
}

const Envelope = ({ onOpen }: EnvelopeProps) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    if (isOpened) return;
    setIsOpening(true);
    setTimeout(() => {
      setIsOpened(true);
      onOpen();
    }, 800);
  };

  return (
    <div
      className="relative cursor-pointer mx-auto"
      style={{ width: "280px", height: "200px", animation: "bounce-soft 2s ease-in-out infinite" }}
      onClick={handleClick}
    >
      {/* Envelope body */}
      <div
        className="absolute inset-0 rounded-lg shadow-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(330 70% 75%), hsl(280 50% 65%))",
        }}
      >
        {/* Envelope inner shadow */}
        <div className="absolute inset-2 rounded-md" style={{ background: "hsl(330 80% 90% / 0.3)" }} />

        {/* Heart seal */}
        {!isOpening && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl" style={{ animation: "pulse-glow 2s infinite" }}>
            💌
          </div>
        )}
      </div>

      {/* Envelope flap */}
      <div
        className="absolute top-0 left-0 w-full origin-top"
        style={{
          height: "100px",
          transition: "transform 0.8s ease-in-out",
          transform: isOpening ? "rotateX(180deg)" : "rotateX(0deg)",
          transformStyle: "preserve-3d",
          zIndex: isOpening ? 0 : 10,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            clipPath: "polygon(0 0, 50% 70%, 100% 0)",
            background: "linear-gradient(135deg, hsl(330 60% 65%), hsl(280 45% 55%))",
          }}
        />
      </div>

      {/* Letter peeking out */}
      {isOpening && !isOpened && (
        <div
          className="absolute left-[10%] w-[80%] bg-white rounded-t-md shadow-lg"
          style={{
            bottom: "20%",
            height: "60%",
            animation: "letter-rise 0.8s ease-out forwards",
          }}
        >
          <div className="p-3 text-center">
            <span className="font-script text-lg" style={{ color: "hsl(330 70% 50%)" }}>
              For You...
            </span>
          </div>
        </div>
      )}

      {/* Tap to open text */}
      {!isOpening && (
        <p
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium whitespace-nowrap"
          style={{ color: "hsl(330 80% 90%)", animation: "bounce-soft 1.5s ease-in-out infinite" }}
        >
          ✨ Tap to open ✨
        </p>
      )}
    </div>
  );
};

export default Envelope;

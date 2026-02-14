import { useState, useCallback, useRef, useEffect } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import ConfettiExplosion from "@/components/ConfettiExplosion";
import Envelope from "@/components/Envelope";
import FlipLetter from "@/components/FlipLetter";
import { Music, Music2, AlertCircle } from "lucide-react"; 

type Phase = "question" | "envelope" | "letter";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("question");
  const [noScale, setNoScale] = useState(1);
  const [noClicks, setNoClicks] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [yesHover, setYesHover] = useState(false);
  
  // --- AUDIO SETUP ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(""); // Untuk menampung pesan error
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Play berhasil
              setAudioError("");
            })
            .catch(error => {
              console.log("Error play:", error);
              setAudioError("Browser memblokir. Klik sekali lagi!");
            });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  // --- LOGIKA LAMA ---
  const handleNo = useCallback(() => {
    const next = noClicks + 1;
    setNoClicks(next);
    if (next >= 6) {
      setNoScale(0);
    } else {
      setNoScale(Math.max(0.15, 1 - next * 0.15));
    }
  }, [noClicks]);

  const handleYes = useCallback(() => {
    setShowConfetti(true);
    
    // Coba nyalakan musik saat klik Yes
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log("Auto-play blocked:", e));
    }

    // WA Link (Opsional)
    // window.open("https://wa.me/6281234567890?text=I+said+YES!+❤️", "_blank");

    setTimeout(() => setPhase("envelope"), 600);
  }, [isPlaying]);

  const handleEnvelopeOpen = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => {
      setPhase("letter");
    }, 900);
  }, []);

  const handleBackgroundClick = () => {
    if (phase === "letter") {
      setPhase("envelope");
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center select-none"
      onClick={handleBackgroundClick}
      style={{
        background: phase === "letter"
          ? "linear-gradient(135deg, hsl(330 60% 30%), hsl(280 50% 25%), hsl(300 40% 20%))"
          : "linear-gradient(135deg, hsl(330 60% 40%), hsl(280 50% 35%), hsl(300 50% 30%))",
        transition: "background 1s ease",
      }}
    >
      {/* DEBUGGING AUDIO:
         Fungsi onError akan memberitahu kita jika file tidak ditemukan.
      */}
      <audio 
        ref={audioRef} 
        loop
        onError={(e) => {
          const msg = "File 'music.mp3' tidak ditemukan di folder public!";
          setAudioError(msg);
          alert(msg); // Munculkan pop-up peringatan
        }}
      >
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {/* Tampilan Error Musik (Jika ada) */}
      {audioError && (
        <div className="fixed top-20 right-4 z-50 bg-red-500 text-white text-xs p-2 rounded shadow-lg flex items-center gap-2 max-w-[200px]">
          <AlertCircle className="w-4 h-4" />
          {audioError}
        </div>
      )}

      {/* Tombol Musik */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          toggleMusic();
        }}
        className={`fixed top-4 right-4 z-50 p-3 rounded-full backdrop-blur-sm transition-all shadow-lg text-white group ${audioError ? 'bg-red-500/50' : 'bg-white/20 hover:bg-white/30'}`}
        title="Putar Musik"
      >
        {isPlaying ? (
          <Music2 className="animate-pulse w-6 h-6" />
        ) : (
          <Music className="w-6 h-6" />
        )}
      </button>

      <FloatingHearts intensity={phase === "letter" ? 25 : 15} />
      <ConfettiExplosion active={showConfetti} />

      {/* Question Phase */}
      {phase === "question" && (
        <div 
          className="relative z-10 text-center px-6 animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-lg mb-2 tracking-widest" style={{ color: "hsl(330 80% 85%)" }}>
            ♡ A Special Question ♡
          </p>
          <h1 className="font-script text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg text-white">
            Will you be my
          </h1>
          <h1 className="font-script text-6xl md:text-8xl font-bold mb-6 drop-shadow-lg" style={{ color: "hsl(330 80% 80%)" }}>
            Valentine?
          </h1>
          <p className="text-xl md:text-2xl mb-10 font-script" style={{ color: "hsl(330 70% 90%)" }}>
            
          </p>

          <div className="flex items-center justify-center gap-6">
            <button
              onClick={handleYes}
              onMouseEnter={() => setYesHover(true)}
              onMouseLeave={() => setYesHover(false)}
              className="px-10 py-4 rounded-full text-xl font-bold shadow-xl transition-all duration-300 transform"
              style={{
                background: yesHover
                  ? "linear-gradient(135deg, hsl(330 80% 55%), hsl(350 80% 60%))"
                  : "linear-gradient(135deg, hsl(330 70% 60%), hsl(350 70% 55%))",
                color: "white",
                transform: yesHover ? "scale(1.1) rotate(2deg)" : "scale(1)",
                boxShadow: "0 0 30px hsl(330 70% 60% / 0.5)",
              }}
            >
              Yes ❤️
            </button>

            {noScale > 0 && (
              <button
                onClick={handleNo}
                className="px-6 py-3 rounded-full font-medium shadow-md transition-all duration-300"
                style={{
                  background: "hsl(280 20% 30% / 0.5)",
                  color: "hsl(280 20% 70%)",
                  transform: `scale(${noScale})`,
                  opacity: noScale < 0.2 ? 0 : noScale,
                  border: "1px solid hsl(280 20% 40% / 0.5)",
                }}
              >
                No 😢
              </button>
            )}
          </div>
        </div>
      )}

      {/* Envelope Phase */}
      {phase === "envelope" && (
        <div 
          className="relative z-10 text-center px-6 animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="font-script text-3xl mb-8 text-white drop-shadow-md">
            Yippeee!! 🥰
          </p>
          <Envelope onOpen={handleEnvelopeOpen} />
          <p className="mt-8 text-sm opacity-60 text-white animate-pulse">
            (Ketuk amplop untuk membuka surat)
          </p>
        </div>
      )}

      {/* Letter Phase */}
      {phase === "letter" && (
        <div className="relative z-10 px-4 py-8 animate-fade-in w-full flex flex-col items-center">
          <p className="font-script text-2xl text-center mb-6" style={{ color: "hsl(330 80% 85%)" }}>
            💌 This Letter For You 💌
          </p>
          
          <div onClick={(e) => e.stopPropagation()}>
            <FlipLetter />
          </div>
          
          <p className="text-center mt-6 text-sm text-white/50">
            (Klik background untuk menutup surat)
          </p>
        </div>
      )}
    </div>
  );
};

export default Index;
import { useState } from 'react';
import confetti from 'canvas-confetti';

interface AnatomicalHeartProps {
  onHeartClick?: () => void;
}

export const AnatomicalHeart = ({ onHeartClick }: AnatomicalHeartProps) => {
  const [isBeatingFast, setIsBeatingFast] = useState<boolean>(false);

  const handleClick = () => {
    setIsBeatingFast(true);
    if (onHeartClick) onHeartClick();

    // Trigger subtle red/gold particle fireworks
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.45 },
      colors: ['#ff2a55', '#c9184a', '#8b0000', '#ffd700', '#ff8fa3'],
    });

    setTimeout(() => {
      setIsBeatingFast(false);
    }, 1500);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'relative',
        width: '180px',
        height: '210px',
        margin: '0 auto 24px',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      title="Click for a heart beat pulse! ❤️"
    >
      {/* Outer Luminous Aura Glow */}
      <div
        style={{
          position: 'absolute',
          inset: '-20px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 42, 85, 0.45) 0%, rgba(139, 0, 0, 0.15) 55%, transparent 75%)',
          filter: 'blur(20px)',
          animation: isBeatingFast ? 'cardiac-pulse-fast 0.6s infinite' : 'cardiac-pulse 1.8s infinite',
        }}
      />

      {/* Anatomical Human Heart SVG */}
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(0 10px 25px rgba(139, 0, 0, 0.8)) drop-shadow(0 0 15px rgba(255, 77, 109, 0.6))',
          animation: isBeatingFast ? 'cardiac-pulse-fast 0.6s infinite' : 'cardiac-pulse 1.8s infinite alternate',
          transformOrigin: 'center center',
        }}
      >
        <defs>
          {/* Main Cardiac Muscle Gradient */}
          <linearGradient id="heartMuscle" x1="20" y1="20" x2="180" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff4d6d" />
            <stop offset="35%" stopColor="#c9184a" />
            <stop offset="70%" stopColor="#8b0000" />
            <stop offset="100%" stopColor="#4a000d" />
          </linearGradient>

          {/* Aorta & Artery Gradient */}
          <linearGradient id="aortaGrad" x1="70" y1="10" x2="130" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff758f" />
            <stop offset="50%" stopColor="#c9184a" />
            <stop offset="100%" stopColor="#7a0016" />
          </linearGradient>

          {/* Superior Vena Cava / Vein Blue-Violet Accent Gradient */}
          <linearGradient id="venaCavaGrad" x1="130" y1="20" x2="160" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a4133c" />
            <stop offset="100%" stopColor="#590d22" />
          </linearGradient>

          {/* Glowing Coronary Vessels */}
          <linearGradient id="coronaryGlow" x1="0" y1="0" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="100%" stopColor="#ff4d6d" />
          </linearGradient>

          {/* Inner Highlight Soft Gloss */}
          <radialGradient id="heartGloss" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
            <stop offset="50%" stopColor="rgba(255, 143, 163, 0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* --- ANATOMICAL STRUCTURE --- */}

        {/* 1. Superior Vena Cava (Right Superior Vessels) */}
        <path
          d="M 132 25 L 148 20 C 154 20, 158 26, 156 34 L 148 70 C 145 80, 138 85, 130 85 L 122 80 Z"
          fill="url(#venaCavaGrad)"
          stroke="#ff8fa3"
          strokeWidth="1.5"
        />

        {/* 2. Arch of Aorta (Main T-Curve on Top Left/Center) */}
        <path
          d="M 85 65 C 75 45, 80 15, 105 15 C 130 15, 138 35, 132 60 L 118 65 C 122 45, 118 30, 105 30 C 94 30, 92 48, 98 65 Z"
          fill="url(#aortaGrad)"
          stroke="#ffd700"
          strokeWidth="1.5"
        />

        {/* Aortic Branch 1: Brachiocephalic Artery */}
        <path d="M 94 22 L 91 6 C 90 3, 94 1, 97 2 L 101 18" fill="url(#aortaGrad)" stroke="#ffd700" strokeWidth="1" />
        {/* Aortic Branch 2: Left Common Carotid Artery */}
        <path d="M 106 16 L 107 4 C 107 2, 111 2, 112 4 L 111 16" fill="url(#aortaGrad)" stroke="#ffd700" strokeWidth="1" />
        {/* Aortic Branch 3: Left Subclavian Artery */}
        <path d="M 117 19 L 122 8 C 123 6, 127 7, 126 9 L 121 22" fill="url(#aortaGrad)" stroke="#ffd700" strokeWidth="1" />

        {/* 3. Pulmonary Artery Trunk (Crosses horizontally below aortic arch) */}
        <path
          d="M 68 75 C 65 60, 78 50, 95 55 C 110 60, 116 75, 112 88 C 95 90, 75 88, 68 75 Z"
          fill="#a4133c"
          stroke="#ff758f"
          strokeWidth="1.5"
        />

        {/* 4. Left Atrium & Auricle (Top Left Shoulder of Heart) */}
        <path
          d="M 52 82 C 42 85, 38 100, 45 115 C 55 125, 70 120, 75 110 C 70 95, 62 82, 52 82 Z"
          fill="url(#heartMuscle)"
          stroke="#c9184a"
          strokeWidth="1.5"
        />

        {/* 5. Main Ventricular Muscle Body (Left & Right Ventricles tapering to apex bottom-left) */}
        <path
          d="M 50 110 C 35 130, 40 165, 55 190 C 72 218, 92 232, 105 235 C 118 232, 142 205, 158 175 C 172 145, 168 115, 150 98 C 135 84, 112 85, 95 95 C 80 85, 62 90, 50 110 Z"
          fill="url(#heartMuscle)"
          stroke="#ff4d6d"
          strokeWidth="2"
        />

        {/* 6. Glossy Surface Highlight Overlay */}
        <path
          d="M 50 110 C 35 130, 40 165, 55 190 C 72 218, 92 232, 105 235 C 118 232, 142 205, 158 175 C 172 145, 168 115, 150 98 C 135 84, 112 85, 95 95 C 80 85, 62 90, 50 110 Z"
          fill="url(#heartGloss)"
        />

        {/* 7. Branching Coronary Arteries (Glowing Golden-Red Vascular Lines) */}
        {/* Anterior Interventricular Sulcus Artery Line */}
        <path
          d="M 96 96 C 94 125, 90 155, 102 195 C 104 205, 104 220, 104 233"
          stroke="url(#coronaryGlow)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 4px #ffd700)' }}
        />
        {/* Branch 1 */}
        <path d="M 94 120 C 82 130, 70 142, 62 155" stroke="url(#coronaryGlow)" strokeWidth="1.8" strokeLinecap="round" />
        {/* Branch 2 */}
        <path d="M 93 145 C 82 158, 72 170, 68 185" stroke="url(#coronaryGlow)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Branch 3 */}
        <path d="M 97 135 C 112 145, 128 155, 142 165" stroke="url(#coronaryGlow)" strokeWidth="1.8" strokeLinecap="round" />
        {/* Branch 4 */}
        <path d="M 100 165 C 115 178, 130 188, 140 195" stroke="url(#coronaryGlow)" strokeWidth="1.5" strokeLinecap="round" />

        {/* Subtle Fat Pads / Sulcus Textures */}
        <path
          d="M 92 98 C 88 115, 96 130, 94 140"
          stroke="rgba(255, 215, 0, 0.4)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

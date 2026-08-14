import { HeartCanvas } from './components/HeartCanvas';
import confetti from 'canvas-confetti';

export function App() {
  const triggerFireworks = () => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#ffffff', '#ff4d6d', '#ff8fa3'],
    });
  };

  return (
    <div
      onClick={triggerFireworks}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Soft Ambient Floating Hearts Background */}
      <HeartCanvas />

      {/* Main Centered Content Box */}
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '750px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Pure White Title */}
        <h1
          className="font-serif"
          style={{
            fontSize: 'clamp(3rem, 7vw, 4.8rem)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '20px',
            letterSpacing: '-0.01em',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          }}
        >
          I Love You Maa
        </h1>

        {/* Bottom Signature Line */}
        <div
          style={{
            fontSize: '0.95rem',
            color: '#ffffff',
            opacity: 0.8,
            letterSpacing: '0.5px',
            fontWeight: 400,
          }}
        >
          Ennoda Nirmal
        </div>
      </main>
    </div>
  );
}

export default App;

import ParticleText from './ParticleText';

const shared = {
  particleSize: 1.5,
  density: 2,
  color: '#ffffff',
  highlightColor: '#8b5cf6',
  scatter: 14,
  gatherDuration: 1000,
  stagger: 30,
  pointerRepel: 20,
  repelRadius: 80,
  idleDrift: 0.15,
  trigger: 'mount' as const,
  fontWeight: 800,
  glow: true,
};

export function ParticleHero({
  text,
  align = 'center',
  className = '',
}: {
  text: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div className={`h-[176px] w-full sm:h-[240px] md:h-[280px] ${className}`}>
      <ParticleText
        text={text}
        align={align}
        fontSize="clamp(2.35rem, 7.4vw, 6.5rem)"
        {...shared}
      />
    </div>
  );
}

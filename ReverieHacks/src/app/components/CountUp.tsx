import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

// The prerenderer renders this component on the server, where useLayoutEffect
// isn't run and React warns about it.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

type CountUpProps = {
  /** Target number. Pass null while the value is still loading. */
  to: number | null;
  /**
   * Roughly the value expected, used to size the box before `to` resolves so
   * first paint doesn't jump. Pass the baked-in fallback.
   */
  reserve?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

/**
 * Counts from zero up to `to` the first time it scrolls into view.
 *
 * Two layers of width pinning keep the ticking number from shifting anything,
 * including itself — see Digits and the hidden spacer below.
 */
export function CountUp({ to, reserve, prefix = '', suffix = '', className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });
  const prefersReducedMotion = useReducedMotion();

  const target = to ?? reserve ?? 0;

  // Starts at the target rather than at zero so the prerendered HTML carries the
  // real figure — a crawler that never runs the animation still reads "1,378"
  // instead of "0". The layout effect below resets it to zero after hydration
  // but before the browser paints, so nobody sees the number twice.
  const [current, setCurrent] = useState(target);

  // The width spacer below is dead weight until the number starts moving, and
  // on the server it would put a second copy of the figure into the markup —
  // so a crawler reads "1,3791,379". Both flip together, in a layout effect, so
  // the browser never paints a frame without the spacer in place.
  const [animating, setAnimating] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (to === null) {
      setAnimating(false);
      setCurrent(target);
      return;
    }

    setAnimating(true);
    setCurrent(0);
    // Mount only: re-running this on every `to` change would restart the count
    // from zero each time the live figures refresh.
  }, [to, target]);

  useEffect(() => {
    if (to === null || !inView || prefersReducedMotion) return;

    // Longer for bigger numbers, but never a slog — a four-figure count should
    // still feel like it lands rather than crawls.
    const duration = Math.min(2.2, 1 + Math.log10(Math.max(to, 1)) * 0.25);

    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1], // fast start, soft landing
      onUpdate: (value) => setCurrent(Math.round(value)),
    });

    return () => controls.stop();
  }, [to, inView, prefersReducedMotion]);

  // Skipping the animation means there is nothing to drive state, so read the
  // target straight through rather than mirroring it into `current`. If there is
  // no fresh live value yet, keep the reserve value on-screen instead of blanking
  // to zero.
  const displayed = prefersReducedMotion ? target : current;

  // The final string is wider than every frame leading up to it, so reserving
  // its width stops a growing number ("7" -> "84" -> "1,010") from reflowing
  // whatever sits next to it.
  const widest = to ?? reserve ?? null;

  return (
    <span ref={ref} className={`inline-grid ${className ?? ''}`}>
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {!animating || widest === null ? null : <Digits text={format(widest, prefix, suffix)} />}
      </span>
      <span className="col-start-1 row-start-1">
        <Digits text={format(displayed, prefix, suffix)} />
      </span>
    </span>
  );
}

function format(value: number, prefix: string, suffix: string) {
  return `${prefix}${value.toLocaleString('en-US')}${suffix}`;
}

/**
 * Sets each digit in a fixed one-character cell.
 *
 * Creato Display ships no tabular-figures feature — `font-variant-numeric` is a
 * no-op against it — and its proportional digits range from 0.345em for '1' to
 * 0.621em for '0'. Without this the number visibly twitches as digits tick over.
 * Separators are left alone so '$', ',' and '+' keep their natural spacing.
 */
function Digits({ text }: { text: string }) {
  return (
    <>
      {[...text].map((char, i) =>
        char >= '0' && char <= '9' ? (
          <span key={i} className="inline-block w-[1ch] text-center">
            {char}
          </span>
        ) : (
          <span key={i}>{char}</span>
        ),
      )}
    </>
  );
}

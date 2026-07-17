/**
 * Minimal, near-flat page backdrop: a single background tone plus a very faint
 * hairline grid. The grid colour comes from a theme variable so it stays subtle
 * in both dark and light mode. No colored blobs or gradients.
 */
export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-background">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 100% 70% at 50% 0%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 70% at 50% 0%, #000 40%, transparent 100%)',
        }}
      />
    </div>
  );
}

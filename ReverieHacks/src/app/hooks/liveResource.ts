import { useSyncExternalStore } from 'react';

/**
 * A single polled value shared by every component that reads it.
 *
 * The Impact page and the <Seo> head updater both want the Devpost figures and
 * both want them fresh; without this each hook call would open its own fetch
 * and its own interval. One store per endpoint means one request, and every
 * reader re-renders off the same snapshot.
 */
export type LiveResource<T> = {
  subscribe: (listener: () => void) => () => void;
  snapshot: () => T;
};

export function createLiveResource<T>(options: {
  /** Read once at module load: prerendered figures, or the baked-in fallback. */
  initial: () => T;
  /** Resolves to the new value, or null to keep whatever is already there. */
  load: (signal: AbortSignal) => Promise<T | null>;
  refreshMs: number;
}): LiveResource<T> {
  // Read on first access rather than at module load. The prerenderer imports
  // this graph before it has finished scraping, and only then publishes the
  // figures on globalThis for initial() to pick up.
  let current: T | undefined;
  const listeners = new Set<() => void>();

  function snapshot(): T {
    if (current === undefined) current = options.initial();
    return current;
  }

  let controller: AbortController | null = null;
  let timer: ReturnType<typeof setInterval> | null = null;

  async function refresh() {
    controller?.abort();
    controller = new AbortController();

    try {
      const next = await options.load(controller.signal);
      if (next === null) return;

      current = next;
      for (const listener of listeners) listener();
    } catch {
      // Leave the last good value on screen. A failed refresh is not worth
      // blanking a page over, and the next tick will try again.
    }
  }

  const onVisible = () => {
    if (document.visibilityState === 'visible') refresh();
  };

  function start() {
    refresh();
    timer = setInterval(refresh, options.refreshMs);
    document.addEventListener('visibilitychange', onVisible);
  }

  function stop() {
    controller?.abort();
    controller = null;

    if (timer !== null) clearInterval(timer);
    timer = null;

    document.removeEventListener('visibilitychange', onVisible);
  }

  return {
    subscribe(listener) {
      const first = listeners.size === 0;
      listeners.add(listener);
      if (first) start();

      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) stop();
      };
    },
    snapshot,
  };
}

export function useLiveResource<T>(resource: LiveResource<T>): T {
  // Same snapshot function for server and client: on a prerendered page both
  // start from the figures baked into the HTML, so hydration matches.
  return useSyncExternalStore(resource.subscribe, resource.snapshot, resource.snapshot);
}

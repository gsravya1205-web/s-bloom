import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { useNavigate } from 'react-router';
import './BloomTransition.css';

type TransitionState = 'idle' | 'active';

interface BloomTransitionContextValue {
  navigateWithBloom: (to: string) => void;
  isTransitioning: boolean;
}

const BloomTransitionContext = createContext<BloomTransitionContextValue>({
  navigateWithBloom: () => {},
  isTransitioning: false,
});

export const useBloomTransition = () => useContext(BloomTransitionContext);

// Transition Timing Constants:
// Total duration: 1000ms (Exactly 1.0 second)
// 0.00 - 0.12s: S-Bloom flower appears at center with ambient glow
// 0.12 - 0.40s: Petals smoothly unfold outward, subtle glitter particles appear
// 0.40 - 0.55s: Full lotus bloom held with peak shimmer highlight
// 0.55 - 0.70s: Petals begin folding inward; route switches silently at 0.55s
// 0.70 - 0.82s: Flower returns to original 5-petal shape, glitter fades
// 0.82 - 1.00s: Destination page smoothly revealed as transition completes
const TOTAL_TRANSITION_MS = 1000;
const NAV_SWITCH_MS = 550;
const WATCHDOG_MAX_MS = 1800;

// Exact 5-Petal geometry preserving original S-Bloom flower structure:
// Resting: Symmetrical 5-petal outline flower (0°, 72°, 144°, -144°, -72°)
// Blooming: Petals unfold into lotus fan (0°, 42°, 84°, -84°, -42°)
const PETAL_CONFIGS = [
  { id: 0, restRot: 0, bloomRot: 0, stagger: 0 },
  { id: 1, restRot: 72, bloomRot: 42, stagger: 12 },
  { id: 2, restRot: 144, bloomRot: 84, stagger: 22 },
  { id: 3, restRot: -144, bloomRot: -84, stagger: 22 },
  { id: 4, restRot: -72, bloomRot: -42, stagger: 12 },
];

// Refined, subtle champagne-gold and soft-white glitter sparkles
const GLITTER_PARTICLES = [
  // Top apex area
  { id: 1, x: 50, y: 10, tx: 0, ty: -5, size: 2.2, delay: 10, isStar: true },
  { id: 2, x: 43, y: 17, tx: -3, ty: -4, size: 1.8, delay: 20, isStar: false },
  { id: 3, x: 57, y: 17, tx: 3, ty: -4, size: 1.8, delay: 25, isStar: false },
  // Upper-right & right wing
  { id: 4, x: 74, y: 30, tx: 5, ty: -3, size: 2.4, delay: 30, isStar: true },
  { id: 5, x: 87, y: 48, tx: 6, ty: 2, size: 2.0, delay: 40, isStar: false },
  { id: 6, x: 68, y: 56, tx: 3, ty: 3, size: 1.6, delay: 50, isStar: false },
  // Upper-left & left wing
  { id: 7, x: 26, y: 30, tx: -5, ty: -3, size: 2.4, delay: 30, isStar: true },
  { id: 8, x: 13, y: 48, tx: -6, ty: 2, size: 2.0, delay: 40, isStar: false },
  { id: 9, x: 32, y: 56, tx: -3, ty: 3, size: 1.6, delay: 50, isStar: false },
  // Lower wing edge accents
  { id: 10, x: 81, y: 62, tx: 4, ty: 4, size: 1.7, delay: 45, isStar: false },
  { id: 11, x: 19, y: 62, tx: -4, ty: 4, size: 1.7, delay: 45, isStar: false },
  // Center petal shimmer
  { id: 12, x: 50, y: 32, tx: 0, ty: -2, size: 1.6, delay: 35, isStar: true },
];

export const BloomTransition: React.FC = () => {
  const navigate = useNavigate();
  const [transitionState, setTransitionState] = useState<TransitionState>('idle');
  const isTransitioningRef = useRef<boolean>(false);
  const pendingDestRef = useRef<string | null>(null);

  const timerNavRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerFinishRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerWatchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialMountRef = useRef<boolean>(true);

  const clearAllTimers = useCallback(() => {
    if (timerNavRef.current) {
      clearTimeout(timerNavRef.current);
      timerNavRef.current = null;
    }
    if (timerFinishRef.current) {
      clearTimeout(timerFinishRef.current);
      timerFinishRef.current = null;
    }
    if (timerWatchdogRef.current) {
      clearTimeout(timerWatchdogRef.current);
      timerWatchdogRef.current = null;
    }
  }, []);

  // Core navigation coordinator with cinematic flower bloom, glow & return (1 second)
  const triggerBloomNavigation = useCallback((targetUrl: string) => {
    if (typeof window === 'undefined') return;

    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      navigate(targetUrl);
      window.scrollTo(0, 0);
      return;
    }

    // Handle rapid repeated clicks safely
    if (isTransitioningRef.current) {
      // If clicking the exact same pending destination, ignore duplicate trigger
      if (pendingDestRef.current === targetUrl) {
        return;
      }
      // If already transitioning, update pending destination target cleanly
      pendingDestRef.current = targetUrl;
      return;
    }

    isTransitioningRef.current = true;
    pendingDestRef.current = targetUrl;
    setTransitionState('active');

    // Failsafe watchdog timer: guarantees overlay is never stuck
    timerWatchdogRef.current = setTimeout(() => {
      setTransitionState('idle');
      isTransitioningRef.current = false;
      pendingDestRef.current = null;
      clearAllTimers();
    }, WATCHDOG_MAX_MS);

    // Switch route silently at 550ms (during full bloom / start of return), keeping animation uninterrupted
    timerNavRef.current = setTimeout(() => {
      const dest = pendingDestRef.current;
      if (dest) {
        navigate(dest);
        window.scrollTo(0, 0);
      }
    }, NAV_SWITCH_MS);

    // Transition completion at exactly 1000ms: restore idle state and reveal destination
    timerFinishRef.current = setTimeout(() => {
      setTransitionState('idle');
      isTransitioningRef.current = false;
      pendingDestRef.current = null;
      clearAllTimers();
    }, TOTAL_TRANSITION_MS);
  }, [navigate, clearAllTimers]);

  // Support Browser Back and Forward buttons (popstate)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      if (!isTransitioningRef.current) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        isTransitioningRef.current = true;
        setTransitionState('active');

        timerFinishRef.current = setTimeout(() => {
          setTransitionState('idle');
          isTransitioningRef.current = false;
          clearAllTimers();
        }, TOTAL_TRANSITION_MS);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [clearAllTimers]);

  // Global click interception across all internal navigation links & redirections
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Skip running animation on initial direct page load or browser refresh
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
    }

    const handleGlobalClick = (event: MouseEvent) => {
      // 1. Only process left mouse clicks without modifier keys (Cmd/Ctrl/Alt/Shift)
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;

      // 2. Locate anchor element if clicked
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;

      // 3. Skip links with explicit opt-out or download attributes
      if (anchor.hasAttribute('data-no-bloom')) return;
      if (anchor.hasAttribute('download')) return;

      // 4. Skip non-standard targets (e.g. target="_blank")
      if (anchor.target && anchor.target !== '_self') return;

      // 5. Inspect raw href
      const rawHref = anchor.getAttribute('href');
      if (!rawHref) return;

      // Skip external protocols
      if (
        rawHref.startsWith('mailto:') ||
        rawHref.startsWith('tel:') ||
        rawHref.startsWith('javascript:')
      ) {
        return;
      }

      // 6. Parse target URL
      let targetUrl: URL;
      try {
        targetUrl = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      // Skip external domains
      if (targetUrl.origin !== window.location.origin) return;

      // 7. Check for in-page hash anchors (e.g., #build, #creative-apply on current page)
      const isSamePathname = targetUrl.pathname === window.location.pathname;
      const isSameSearch = targetUrl.search === window.location.search;

      if (rawHref.startsWith('#') || (isSamePathname && isSameSearch && targetUrl.hash)) {
        // Allow native in-page anchor jump / smooth scrolling without page transition
        return;
      }

      // 8. If clicking link to current page with same search and no hash, scroll to top gently
      if (isSamePathname && isSameSearch && !targetUrl.hash) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 9. Legitimate internal navigation redirection!
      event.preventDefault();
      const destination = targetUrl.pathname + targetUrl.search + targetUrl.hash;
      triggerBloomNavigation(destination);
    };

    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleGlobalClick, { capture: true });
      clearAllTimers();
    };
  }, [triggerBloomNavigation, clearAllTimers]);

  const isActive = transitionState === 'active';

  return (
    <BloomTransitionContext.Provider
      value={{
        navigateWithBloom: triggerBloomNavigation,
        isTransitioning: isActive,
      }}
    >
      <div
        className={`sbloom-transition-overlay ${isActive ? 'is-active' : 'is-idle'}`}
        aria-hidden="true"
        role="presentation"
      >
        {/* Soft Radiant Ambient Glow Layer Behind Flower */}
        <div className="sbloom-ambient-glow" />

        {/* Centered Noticeably Larger S-Bloom Flower Stage (120px Desktop / 96px Mobile) */}
        <div className="sbloom-flower-stage">
          <svg
            viewBox="0 0 100 100"
            className="sbloom-flower-svg"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 5 Distinct Outline Petals preserving original shape & proportions */}
            <g className="sbloom-petals-group">
              {PETAL_CONFIGS.map((petal) => (
                <g
                  key={`story-petal-${petal.id}`}
                  className="sbloom-petal"
                  style={
                    {
                      '--rest-rot': `${petal.restRot}deg`,
                      '--bloom-rot': `${petal.bloomRot}deg`,
                      '--petal-stagger': `${petal.stagger}ms`,
                    } as React.CSSProperties
                  }
                >
                  {/* Clean, refined loop outline petal in champagne-gold stroke */}
                  <path
                    d="M 50,47.5 C 41.5,42 41,26 50,16.5 C 59,26 58.5,42 50,47.5 Z"
                    stroke="#C9952E"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </g>
              ))}
            </g>

            {/* Subtle Dark Brown (#5A3825) Shimmer Sparkles */}
            <g className="sbloom-glitter-group">
              {GLITTER_PARTICLES.map((p) => {
                const style = {
                  '--tx': `${p.tx}px`,
                  '--ty': `${p.ty}px`,
                  '--p-delay': `${p.delay}ms`,
                } as React.CSSProperties;

                if (p.isStar) {
                  // Delicate 4-pointed micro diamond sparkle star (✦)
                  return (
                    <path
                      key={`glitter-star-${p.id}`}
                      className="sbloom-glitter-particle"
                      style={style}
                      d={`M ${p.x},${p.y - 3} Q ${p.x},${p.y} ${p.x + 3},${p.y} Q ${p.x},${p.y} ${p.x},${p.y + 3} Q ${p.x},${p.y} ${p.x - 3},${p.y} Z`}
                      fill="#5A3825"
                      stroke="#5A3825"
                      strokeWidth="0.4"
                    />
                  );
                }

                // Tiny soft circular sparkle highlight
                return (
                  <circle
                    key={`glitter-dot-${p.id}`}
                    className="sbloom-glitter-particle"
                    style={style}
                    cx={p.x}
                    cy={p.y}
                    r={p.size / 2}
                    fill="#5A3825"
                    stroke="#5A3825"
                    strokeWidth="0.5"
                  />
                );
              })}
            </g>

            {/* Central Pistil Anchor Node */}
            <g className="sbloom-pistil-group">
              <circle
                cx="50"
                cy="50"
                r="2.8"
                fill="none"
                stroke="#C9952E"
                strokeWidth="1.3"
              />
              <circle cx="50" cy="50" r="1.1" fill="#35251F" />
            </g>
          </svg>
        </div>
      </div>
    </BloomTransitionContext.Provider>
  );
};

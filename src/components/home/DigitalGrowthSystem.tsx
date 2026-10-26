import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Compass, File as FileIcon, Megaphone, BarChart3, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

export const DigitalGrowthSystem: React.FC = () => {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const stages = [
    {
      id: 'build',
      num: '01',
      label: 'BUILD',
      headline: 'Be easier to find.',
      icon: Compass,
      link: '/solutions#build',
    },
    {
      id: 'create',
      num: '02',
      label: 'CREATE',
      headline: 'Be easier to understand.',
      icon: FileIcon,
      link: '/solutions#create',
    },
    {
      id: 'promote',
      num: '03',
      label: 'PROMOTE',
      headline: 'Be easier to reach the people who matter.',
      icon: Megaphone,
      link: '/solutions#promote',
    },
    {
      id: 'grow',
      num: '04',
      label: 'GROW',
      headline: 'Be easier to drive sustainable growth.',
      icon: BarChart3,
      link: '/solutions#grow',
    }
  ];

  return (
    <section ref={sectionRef} className="dgs-section section">
      <div className="container">
        <ScrollReveal delay={0}>
          <div className="dgs-intro">
            <div className="dgs-badge">
              <span className="dgs-badge-line" aria-hidden="true" />
              <span className="dgs-label">WHAT SBLOOM CHANGES</span>
              <span className="dgs-badge-line" aria-hidden="true" />
            </div>
            <h2 className="dgs-main-heading">
              We turn what you do well into something people can see, understand and act on.
            </h2>
          </div>
        </ScrollReveal>

        <div className={`dgs-flow-wrapper ${inView ? 'dgs-animated' : ''}`}>
          {/* Clean 4-Stage Horizontal Flow (No Oversized Circular Cards or Tall Boxes) */}
          <div className="dgs-flow-grid">
            {stages.map((stage, idx) => {
              const isHovered = hoveredStage === stage.id;
              const IconComponent = stage.icon;

              return (
                <div
                  key={stage.id}
                  className={`dgs-stage-col ${isHovered ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredStage(stage.id)}
                  onMouseLeave={() => setHoveredStage(null)}
                >
                  {/* Prominent Stage Number (01 - 04) in Muted Gold */}
                  <span className="dgs-stage-num">{stage.num}</span>

                  {/* Refined Circular Outline Icon Marker with Connecting Line */}
                  <div className="dgs-marker-wrap">
                    <div className="dgs-marker-circle">
                      <IconComponent size={24} strokeWidth={1.5} className="dgs-marker-icon" />
                    </div>

                    {/* Thin Champagne-Gold Connecting Line & Elegant Dot to Next Stage */}
                    {idx < stages.length - 1 && (
                      <div className="dgs-connector" aria-hidden="true">
                        <span className="dgs-connector-base" />
                        <span className="dgs-connector-fill" />
                        <span className="dgs-connector-point" />
                      </div>
                    )}
                  </div>

                  {/* Subtle Vertical Connector Tick */}
                  <span className="dgs-stage-tick" aria-hidden="true" />

                  {/* Stage Name */}
                  <span className="dgs-stage-name">{stage.label}</span>

                  {/* Description directly beneath */}
                  <p className="dgs-stage-desc">{stage.headline}</p>

                  {/* Explore Button */}
                  <div className="dgs-stage-action">
                    <Link
                      to={stage.link}
                      className="dgs-explore-btn"
                      aria-label={`Explore ${stage.label}`}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <span>Explore {stage.label.charAt(0) + stage.label.slice(1).toLowerCase()}</span>
                      <ArrowRight size={13} className="dgs-btn-arrow" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalGrowthSystem;


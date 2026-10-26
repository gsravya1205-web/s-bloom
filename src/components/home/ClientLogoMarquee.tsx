import React from "react";
import { CLIENT_LOGOS, type ClientLogo } from "../../data/clientLogos";
import { ScrollReveal } from "../ScrollReveal";
import "./ClientLogoMarquee.css";

interface ClientLogoMarqueeProps {
  title?: string;
  subtitle?: string;
  logos?: ClientLogo[];
}

export const ClientLogoMarquee: React.FC<ClientLogoMarqueeProps> = ({
  logos = CLIENT_LOGOS,
}) => {
  // Stagger the 9 logos across the 3 rows with clean spacing so each line features different prominent logos
  const row1Logos = [...logos];
  const row2Logos = [...logos.slice(3), ...logos.slice(0, 3)];
  const row3Logos = [...logos.slice(6), ...logos.slice(0, 6)];

  const renderLogoCard = (logo: ClientLogo, keySuffix: string | number) => (
    <div key={`${logo.id}-${keySuffix}`} className="logo-item" title={logo.name}>
      <img
        src={logo.image}
        alt={logo.name}
        className="client-marquee-img"
        loading="lazy"
      />
    </div>
  );

  return (
    <section className="client-logo-marquee-section" aria-label="Client Showcase">
      <div className="client-logo-container">
        {/* Header */}
        <ScrollReveal delay={0}>
          <div className="client-logo-header">
            <div className="client-logo-eyebrow-wrap">
              <span className="client-logo-eyebrow-line" aria-hidden="true" />
              <span className="client-logo-eyebrow">✦ TRUSTED BY INDUSTRY LEADERS</span>
              <span className="client-logo-eyebrow-line" aria-hidden="true" />
            </div>

            <h2 className="client-logo-title">
              Powering Growth for Top Healthcare, Education &{" "}
              <span className="client-logo-gold">Enterprise Brands.</span>
            </h2>


          </div>
        </ScrollReveal>

        {/* 3 Scrolling Lines (Marquee Rows with Alternating Directions) */}
        <div className="logo-marquee-wrapper">
          {/* Edge Fade Masks for Smooth Luxury Entrance & Exit */}
          <div className="logo-marquee-fade-left" aria-hidden="true" />
          <div className="logo-marquee-fade-right" aria-hidden="true" />

          {/* LINE 1: Scrolls Left to Right */}
          <div className="logo-marquee-row dir-ltr" aria-label="Trusted Clients Row 1">
            <div className="logo-marquee-track speed-normal">
              <div className="logo-marquee-group">
                {row1Logos.map((logo, idx) => renderLogoCard(logo, `r1-a-${idx}`))}
              </div>
              <div className="logo-marquee-group" aria-hidden="true">
                {row1Logos.map((logo, idx) => renderLogoCard(logo, `r1-b-${idx}`))}
              </div>
            </div>
          </div>

          {/* LINE 2: Scrolls in Reverse (Right to Left) */}
          <div className="logo-marquee-row dir-rtl" aria-label="Trusted Clients Row 2">
            <div className="logo-marquee-track speed-fast">
              <div className="logo-marquee-group">
                {row2Logos.map((logo, idx) => renderLogoCard(logo, `r2-a-${idx}`))}
              </div>
              <div className="logo-marquee-group" aria-hidden="true">
                {row2Logos.map((logo, idx) => renderLogoCard(logo, `r2-b-${idx}`))}
              </div>
            </div>
          </div>

          {/* LINE 3: Scrolls Left to Right */}
          <div className="logo-marquee-row dir-ltr" aria-label="Trusted Clients Row 3">
            <div className="logo-marquee-track speed-slow">
              <div className="logo-marquee-group">
                {row3Logos.map((logo, idx) => renderLogoCard(logo, `r3-a-${idx}`))}
              </div>
              <div className="logo-marquee-group" aria-hidden="true">
                {row3Logos.map((logo, idx) => renderLogoCard(logo, `r3-b-${idx}`))}
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Bottom Trust Note */}
        <div className="client-logo-bottom-note">
          <span className="client-logo-note-dot" />
          <span>Proven ROI across verified regional, national & enterprise campaigns</span>
        </div>
      </div>
    </section>
  );
};

export default ClientLogoMarquee;

import React, { useState, useRef } from "react";
import { Link } from "react-router";
import { Volume2, VolumeX } from "lucide-react";
import { ScrollReveal } from "../../components/ScrollReveal";

export const PromotePage = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="page sol-detail-wrapper">
      <section className="sol-hero">
        <div className="container">
          <div className="sol-detail-hero-grid">
            <ScrollReveal delay={0}>
              <div className="sol-detail-hero-text">
                <span className="sol-hero-label">S-BLOOM SYSTEM — 03</span>
                <h1 className="sol-hero-title">Reach relevant audiences.</h1>
                <p className="sol-hero-desc">
                  Once your foundation is strong and your expertise is clear, the PROMOTE phase amplifies your presence, putting your organization directly in front of the audiences that matter most to accelerate discovery.
                </p>
                <div style={{ marginTop: '24px' }}>
                  <Link to="/contact" className="btn btn-primary">Get Started</Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Right side: Promoted Campaign Video */}
            <ScrollReveal delay={150}>
              <div className="sol-detail-video-wrap">
                <div className="sol-promote-video-box">
                  <video
                    ref={videoRef}
                    src="/IMG_3694.mp4"
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    className="sol-promote-video-element"
                  />
                  <button 
                    type="button" 
                    onClick={toggleSound} 
                    className="sol-video-sound-floating-btn"
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="sol-activities">
        <div className="container">
          <div className="sol-activities-list">
            <ScrollReveal delay={100}>
              <div className="sol-activity-item">
                <h3>Meta Ads</h3>
                <p>Targeted campaigns on Facebook and Instagram, ideal for demographic targeting in Education.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="sol-activity-item">
                <h3>Google Ads</h3>
                <p>High-intent search campaigns, crucial for capturing urgent Healthcare needs.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="sol-activity-item">
                <h3>Performance Marketing & Campaign Management</h3>
                <p>End-to-end management of your advertising spend to ensure measurable progress.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container text-center">
          <ScrollReveal delay={0}>
            <h2>Ready to grow your digital presence?</h2>
            <div className="hero-buttons" style={{ marginTop: '40px', justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn-primary">Get Started</Link>
              <Link to="/solutions" className="btn btn-secondary" style={{ marginLeft: '16px' }}>Back to Solutions</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default PromotePage;

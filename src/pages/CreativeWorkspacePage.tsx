import React, { useState, useEffect, useRef } from 'react';
import { ScrollReveal } from "../components/ScrollReveal";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  User,
  Mail,
  Phone,
  Link2,
  Briefcase,
  Megaphone,
  Palette,
  UserPlus,
  Users,
} from 'lucide-react';
import { CreativeOrbit } from '../components/CreativeOrbit';
import { FORM_ENDPOINTS, submitToGoogleSheet } from '../config/forms';
import './CreativeWorkspacePage.css';

// Custom / Crisp SVG Icons precisely matching Image 2
const VideoEditorIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="15" height="12" rx="2" />
    <polygon points="8,7 13,10 8,13" fill="currentColor" stroke="none" />
    <path d="M17 9l5-3v12l-5-3v-6z" />
  </svg>
);

const ContentWriterIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="13" y2="17" />
  </svg>
);

const WebDevIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const SeoIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <path d="M4 11l5-5 5 5 6-6" />
  </svg>
);

interface CreativeRoleInfo {
  id: string;
  title: string;
  icon: React.ComponentType;
  description: string;
}

const CREATIVE_ROLES: CreativeRoleInfo[] = [
  {
    id: 'video-editors',
    title: 'Video Editors',
    icon: VideoEditorIcon,
    description: 'Edit reels, promotional videos, and short videos for brands. Turn ideas into creative videos with smooth cuts and clear storytelling.'
  },
  {
    id: 'content-writers',
    title: 'Content Writers',
    icon: ContentWriterIcon,
    description: 'Write engaging video scripts, social media captions, articles, and brand stories that are easy to understand and help your business reach more people.'
  },
  {
    id: 'web-developers',
    title: 'Web Developers',
    icon: WebDevIcon,
    description: 'Build and improve websites, landing pages and web applications that are modern, fast, and user-friendly.'
  },
  {
    id: 'seo-specialists',
    title: 'SEO Specialists',
    icon: SeoIcon,
    description: 'Work on search strategy, on-page optimization and local SEO to help businesses get better visibility online.'
  },
  {
    id: 'social-media-managers',
    title: 'Social Media Managers',
    icon: () => <Megaphone size={22} strokeWidth={2.2} />,
    description: 'Plan and create content for social media platforms, manage posting schedules, and improve engagement.'
  },
  {
    id: 'graphic-designers',
    title: 'Graphic Designers',
    icon: () => <Palette size={22} strokeWidth={2.2} />,
    description: 'Create visual content, social media designs, banners, and other brand assets that communicate clearly and look professional.'
  }
];

interface CreativeFormData {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  portfolioUrl: string;
}

export const CreativeWorkspacePage = () => {
  const [formHighlight, setFormHighlight] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreativeFormData>({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    portfolioUrl: '',
  });

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.location.hash === '#creative-apply' ||
      window.location.pathname.includes('/apply')
    ) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
        setFormHighlight(true);
        setTimeout(() => setFormHighlight(false), 1800);
      }, 250);
    }
  }, []);

  const scrollToApply = (prefillRole?: string) => {
    if (prefillRole) {
      setFormData(prev => ({ ...prev, role: prefillRole }));
    }
    setFormHighlight(true);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      setFormHighlight(false);
    }, 1800);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await submitToGoogleSheet(FORM_ENDPOINTS.CREATIVE_WORKSPACE, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        portfolioUrl: formData.portfolioUrl,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit creative application:', err);
      setErrorMessage(
        'Unable to submit your application right now. Please check your internet connection or try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setErrorMessage(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      role: '',
      portfolioUrl: '',
    });
  };

  return (
    <div className="cw-page">
      {/* =================================================================
         1. HERO SECTION (Clean, Minimal Ivory Background)
         ================================================================= */}
      <section className="cw-hero">
        <div className="container cw-hero-grid">
          <div>
            <ScrollReveal delay={0}>
              <div className="cw-eyebrow-wrap">
                <span className="cw-eyebrow">CREATIVE WORKSPACE</span>
                <span className="cw-eyebrow-line" />
              </div>

              <h1 className="cw-hero-title">
                Your skills.<br />
                Our network.<br />
                <span className="cw-gold-italic">Better work, together.</span>
              </h1>

              <p className="cw-hero-desc">
                An AI-supported creative partner platform connecting skilled professionals with businesses that need their expertise. Find collaboration opportunities across web design, SEO, content, social media, video, digital marketing, and more.
              </p>

              <div className="cw-hero-actions">
                <button onClick={() => scrollToApply()} className="cw-btn-hero">
                  <span>Join the Creative Network</span>
                  <ArrowRight size={18} strokeWidth={2.4} className="cw-btn-arrow" />
                </button>
              </div>
            </ScrollReveal>
          </div>
          
          <div className="cw-visual" style={{ zIndex: 10 }}>
            <ScrollReveal delay={200} className="w-full h-full" style={{ position: 'relative', width: '100%', height: '100%' }}>
              <CreativeOrbit />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =================================================================
         2. OPPORTUNITIES / 6 ROLES SECTION (Matching Image 2 Top)
         ================================================================= */}
      <section id="roles" className="cw-roles-section">
        <div className="container">
          <div className="cw-section-header">
            <ScrollReveal delay={100}>
              <div className="cw-section-eyebrow">
                <span className="cw-section-rule" />
                <span className="cw-section-label">CREATIVE WORKSPACE</span>
                <span className="cw-section-rule" />
              </div>
              <h2 className="cw-section-title">Your Expertise Has a Place Here</h2>
              <p className="cw-section-subtitle">
                Explore opportunities to collaborate with S-Bloom on impactful client projects.
              </p>
            </ScrollReveal>
          </div>
          
          <div className="cw-roles-grid-6">
            {CREATIVE_ROLES.map((role, idx) => {
              const IconComponent = role.icon;

              return (
                <ScrollReveal key={role.id} delay={100 + idx * 60} className="h-full">
                  <div className="cw-role-card">
                    <div className="cw-role-icon-box">
                      <IconComponent />
                    </div>
                    
                    <h3 className="cw-role-title">{role.title}</h3>
                    <p className="cw-role-desc">{role.description}</p>
                    
                    <button
                      type="button"
                      className="cw-role-apply-btn"
                      onClick={() => scrollToApply(role.title)}
                    >
                      <span>Apply Now</span>
                      <ArrowRight size={15} strokeWidth={2.4} />
                    </button>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================================
         3. HOW IT WORKS SECTION (Matching Image 3 - Before the Form)
         ================================================================= */}
      <section id="how-it-works" className="cw-how-it-works-section">
        <div className="container">
          <div className="cw-section-header">
            <ScrollReveal delay={100}>
              <div className="cw-section-eyebrow">
                <span className="cw-section-rule" />
                <span className="cw-section-label">HOW IT WORKS</span>
                <span className="cw-section-rule" />
              </div>
              <h2 className="cw-section-title">A simple way to collaborate.</h2>
              <p className="cw-section-subtitle">
                Join our creative network and work on projects that match your skills and interests.
              </p>
            </ScrollReveal>
          </div>

          <div className="cw-hiw-flow-wrap">
            {/* Horizontal Dashed Connecting Line */}
            <div className="cw-hiw-connecting-line" aria-hidden="true" />

            <div className="cw-hiw-steps-grid">
              {/* Step 01 */}
              <ScrollReveal delay={150} className="h-full">
                <div className="cw-hiw-step-item">
                  <div className="cw-hiw-icon-bubble">
                    <UserPlus size={30} strokeWidth={2} />
                  </div>
                  <span className="cw-hiw-step-num">01</span>
                  <h3 className="cw-hiw-step-title">Apply to join</h3>
                  <p className="cw-hiw-step-desc">
                    Tell us about your skills, experience and the type of work you want to do.
                  </p>
                </div>
              </ScrollReveal>

              {/* Step 02 */}
              <ScrollReveal delay={250} className="h-full">
                <div className="cw-hiw-step-item">
                  <div className="cw-hiw-icon-bubble">
                    <Briefcase size={28} strokeWidth={2} />
                  </div>
                  <span className="cw-hiw-step-num">02</span>
                  <h3 className="cw-hiw-step-title">Get matched</h3>
                  <p className="cw-hiw-step-desc">
                    We connect you with relevant project opportunities from businesses in our network.
                  </p>
                </div>
              </ScrollReveal>

              {/* Step 03 */}
              <ScrollReveal delay={350} className="h-full">
                <div className="cw-hiw-step-item">
                  <div className="cw-hiw-icon-bubble">
                    <Users size={30} strokeWidth={2} />
                  </div>
                  <span className="cw-hiw-step-num">03</span>
                  <h3 className="cw-hiw-step-title">Work together</h3>
                  <p className="cw-hiw-step-desc">
                    Collaborate, create and contribute your expertise to meaningful projects.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
         4. QUICK APPLICATION FORM SECTION (Matching Image 2 Bottom)
         ================================================================= */}
      <section id="creative-apply" ref={formRef} className="cw-apply-section">
        <div className="cw-apply-container">
          <ScrollReveal delay={100}>
            <div className={`cw-apply-card ${formHighlight ? 'highlight-focus' : ''}`}>
              <div className="cw-apply-header">
                <div className="cw-apply-eyebrow">
                  <span className="cw-section-rule" />
                  <span className="cw-apply-eyebrow-text">QUICK APPLICATION</span>
                  <span className="cw-section-rule" />
                </div>
                <h2 className="cw-apply-title">Join the S-Bloom Creative Network</h2>
                <p className="cw-apply-subtitle">
                  Submit your portfolio and contact details below. We'll reach out with matching projects.
                </p>
              </div>

              {submitted ? (
                <div className="cw-apply-success">
                  <div className="cw-success-icon-wrap">
                    <CheckCircle2 size={32} strokeWidth={2.2} />
                  </div>
                  <h3 className="cw-success-title">Creative Application Received!</h3>
                  <p className="cw-success-msg">
                    Thank you, <strong>{formData.fullName || 'Creator'}</strong>. We have received your portfolio details for the <strong>{formData.role || 'Creative Network'}</strong> role. Our team will review your work and contact you with matching projects.
                  </p>
                  <button type="button" className="cw-reset-btn" onClick={handleResetForm}>
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form className="cw-apply-form" onSubmit={handleSubmit}>
                  <div className="cw-apply-form-grid">
                    {/* Full Name */}
                    <div className="cw-form-group">
                      <label htmlFor="cw-fullName" className="cw-form-label">
                        Full Name <span className="cw-req-star">*</span>
                      </label>
                      <div className="cw-input-wrap">
                        <User size={15} strokeWidth={1.8} className="cw-input-icon" />
                        <input
                          type="text"
                          id="cw-fullName"
                          name="fullName"
                          required
                          placeholder="Your full name"
                          className="cw-input"
                          value={formData.fullName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="cw-form-group">
                      <label htmlFor="cw-email" className="cw-form-label">
                        Email Address <span className="cw-req-star">*</span>
                      </label>
                      <div className="cw-input-wrap">
                        <Mail size={15} strokeWidth={1.8} className="cw-input-icon" />
                        <input
                          type="email"
                          id="cw-email"
                          name="email"
                          required
                          placeholder="you@domain.com"
                          className="cw-input"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="cw-form-group">
                      <label htmlFor="cw-phone" className="cw-form-label">
                        Phone / WhatsApp <span className="cw-req-star">*</span>
                      </label>
                      <div className="cw-input-wrap">
                        <Phone size={15} strokeWidth={1.8} className="cw-input-icon" />
                        <input
                          type="tel"
                          id="cw-phone"
                          name="phone"
                          required
                          placeholder="+91 98765 43210"
                          className="cw-input"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    {/* Role / Discipline */}
                    <div className="cw-form-group">
                      <label htmlFor="cw-role" className="cw-form-label">
                        Creative Role <span className="cw-req-star">*</span>
                      </label>
                      <div className="cw-input-wrap">
                        <Briefcase size={15} strokeWidth={1.8} className="cw-input-icon" />
                        <select
                          id="cw-role"
                          name="role"
                          required
                          className="cw-select"
                          value={formData.role}
                          onChange={handleInputChange}
                        >
                          <option value="">Select your discipline...</option>
                          <option value="Video Editors">Video Editors</option>
                          <option value="Content Writers">Content Writers</option>
                          <option value="Web Developers">Web Developers</option>
                          <option value="SEO Specialists">SEO Specialists</option>
                          <option value="Social Media Managers">Social Media Managers</option>
                          <option value="Graphic Designers">Graphic Designers</option>
                          <option value="Other Creative Role">Other Creative Role</option>
                        </select>
                      </div>
                    </div>

                    {/* Portfolio / Reel Link */}
                    <div className="cw-form-group cw-apply-full-width">
                      <label htmlFor="cw-portfolioUrl" className="cw-form-label">
                        Portfolio / Reel Link <span className="cw-req-star">*</span>
                      </label>
                      <div className="cw-input-wrap">
                        <Link2 size={15} strokeWidth={1.8} className="cw-input-icon" />
                        <input
                          type="url"
                          id="cw-portfolioUrl"
                          name="portfolioUrl"
                          required
                          placeholder="Behance, Google Drive, YouTube, Vimeo, Instagram, or portfolio URL"
                          className="cw-input"
                          value={formData.portfolioUrl}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="cw-apply-error-banner" role="alert">
                      <AlertCircle size={16} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="cw-apply-submit-btn"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Submitting Application...' : 'Submit Application'}</span>
                    <ArrowRight size={16} strokeWidth={2.4} />
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default CreativeWorkspacePage;

import React, { useState } from 'react';
import {
  User,
  Building2,
  Mail,
  Phone,
  LayoutGrid,
  ArrowRight,
  MessageSquare,
  Lightbulb,
  BarChart3,
  FileText,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { FORM_ENDPOINTS, submitToGoogleSheet } from '../config/forms';
import './ContactPage.css';

interface FormData {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  industry: string;
  improve: string;
}

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    industry: '',
    improve: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await submitToGoogleSheet(FORM_ENDPOINTS.CONTACT_LEADS, {
        fullName: formData.fullName,
        organization: formData.organization,
        email: formData.email,
        phone: formData.phone,
        industry: formData.industry,
        improve: formData.improve,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit contact inquiry:', err);
      setErrorMessage(
        'Unable to submit your details right now. Please check your internet connection or try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMessage(null);
    setFormData({
      fullName: '',
      organization: '',
      email: '',
      phone: '',
      industry: '',
      improve: '',
    });
  };

  return (
    <div className="contact-page-wrapper">
      {/* =================================================================
          EXACT REFERENCE BACKGROUND: ANIMATED GOLDEN HORIZON
          Warm ivory canvas, sweeping champagne-gold trails converging
          at the radiant golden focal burst with glowing silk ribbon dunes.
          ================================================================= */}
      <div className="contact-horizon-bg" aria-hidden="true">
        {/* Soft Radial Ambient Base */}
        <div className="contact-ambient-radial" />

        {/* Full-bleed SVG Golden Horizon */}
        <svg
          className="contact-trails-svg"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Silk Ribbon Gradient Fills */}
            <linearGradient id="silkDuneGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F6EADB" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#EDD8C0" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#FBF6EE" stopOpacity="0.06" />
            </linearGradient>

            <linearGradient id="silkDuneGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F2DCBF" stopOpacity="0.48" />
              <stop offset="60%" stopColor="#E8CCAA" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#FBF6EE" stopOpacity="0.03" />
            </linearGradient>

            {/* Soft, Diffused Champagne Glow Behind Curves */}
            <radialGradient id="diffusedChampagneGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDEBC9" stopOpacity="0.42" />
              <stop offset="40%" stopColor="#F5D79E" stopOpacity="0.22" />
              <stop offset="75%" stopColor="#D6A13A" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#D6A13A" stopOpacity="0" />
            </radialGradient>

            {/* Delicate Translucent White Flowing Line Gradients */}
            <linearGradient id="delicateWhiteGrad1" x1="0%" y1="20%" x2="100%" y2="30%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.10" />
              <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.60" />
              <stop offset="50%" stopColor="#FFFDF7" stopOpacity="0.82" />
              <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
            </linearGradient>

            <linearGradient id="delicateWhiteGrad2" x1="0%" y1="40%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.08" />
              <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#FFFDF5" stopOpacity="0.75" />
              <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.50" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.10" />
            </linearGradient>

            <linearGradient id="delicateWhiteGrad3" x1="0%" y1="70%" x2="100%" y2="70%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.08" />
              <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#FFFDF0" stopOpacity="0.70" />
              <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.08" />
            </linearGradient>

            {/* Restrained Champagne-Gold Accent Gradients */}
            <linearGradient id="subtleGoldGrad1" x1="0%" y1="30%" x2="100%" y2="40%">
              <stop offset="0%" stopColor="#D6A13A" stopOpacity="0.08" />
              <stop offset="30%" stopColor="#D6A13A" stopOpacity="0.42" />
              <stop offset="50%" stopColor="#E5B255" stopOpacity="0.60" />
              <stop offset="70%" stopColor="#D6A13A" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#B77A3E" stopOpacity="0.10" />
            </linearGradient>

            <linearGradient id="subtleGoldGrad2" x1="100%" y1="15%" x2="0%" y2="60%">
              <stop offset="0%" stopColor="#D6A13A" stopOpacity="0.08" />
              <stop offset="30%" stopColor="#D6A13A" stopOpacity="0.38" />
              <stop offset="50%" stopColor="#E8B85C" stopOpacity="0.55" />
              <stop offset="75%" stopColor="#B77A3E" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#D6A13A" stopOpacity="0.08" />
            </linearGradient>

            {/* Soft Ambient Glow Filter */}
            <filter id="ambientGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="22" />
            </filter>

            {/* Delicate Line Softening Filter */}
            <filter id="fineLineSoftFilter" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="0.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* LAYER 1: Silk Ribbon Dunes */}
          <g className="contact-anim-ribbons">
            <path
              d="M -50 670 C 260 740, 520 630, 780 675 C 1080 715, 1360 645, 1650 685 L 1650 950 L -50 950 Z"
              fill="url(#silkDuneGrad1)"
            />
            <path
              d="M -50 760 C 300 840, 550 770, 780 675 C 1050 580, 1340 760, 1650 780 L 1650 950 L -50 950 Z"
              fill="url(#silkDuneGrad2)"
            />
          </g>

          {/* LAYER 2: Soft, Diffused Champagne Ambient Glow Behind Curves */}
          <g className="contact-anim-ambient-glow">
            <ellipse
              cx="780"
              cy="680"
              rx="180"
              ry="70"
              fill="url(#diffusedChampagneGlow)"
              filter="url(#ambientGlowFilter)"
            />
          </g>

          {/* LAYER 3: Very Fine, Delicate White & Thin Champagne-Gold Flowing Curves */}
          <g className="contact-anim-fine-lines">
            {/* Line 1: Primary wide, smooth, graceful translucent white arc */}
            <path
              d="M -30 240 C 260 360, 520 540, 780 675 C 1040 610, 1340 440, 1630 260"
              stroke="url(#delicateWhiteGrad1)"
              strokeWidth="1.2"
              strokeLinecap="round"
              filter="url(#fineLineSoftFilter)"
            />
            {/* Line 1b: Delicate companion translucent white hairline */}
            <path
              d="M -30 215 C 250 335, 510 525, 775 668 C 1045 605, 1345 425, 1630 235"
              stroke="url(#delicateWhiteGrad2)"
              strokeWidth="0.85"
              strokeLinecap="round"
              opacity="0.80"
            />

            {/* Line 2: Thin champagne-gold curve */}
            <path
              d="M -30 390 C 270 520, 530 625, 780 675 C 1060 640, 1360 560, 1630 460"
              stroke="url(#subtleGoldGrad1)"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            {/* Line 2b: Fine translucent white hairline curve below gold curve */}
            <path
              d="M -30 420 C 280 540, 540 635, 784 678 C 1065 650, 1365 575, 1630 485"
              stroke="url(#delicateWhiteGrad2)"
              strokeWidth="0.80"
              strokeLinecap="round"
              opacity="0.70"
            />

            {/* Line 3: Lower white curve sweeping along dunes */}
            <path
              d="M -30 720 C 240 790, 520 735, 780 675 C 1060 715, 1350 770, 1630 725"
              stroke="url(#delicateWhiteGrad3)"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            {/* Line 3b: Companion white hairline along dune base */}
            <path
              d="M -30 745 C 245 810, 525 750, 782 682 C 1065 722, 1355 780, 1630 740"
              stroke="url(#delicateWhiteGrad2)"
              strokeWidth="0.75"
              strokeLinecap="round"
              opacity="0.65"
            />

            {/* Line 4: Descending thin champagne-gold curve from right behind form */}
            <path
              d="M 1630 170 C 1360 310, 1080 530, 780 675 C 580 690, 300 660, -30 600"
              stroke="url(#subtleGoldGrad2)"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            {/* Line 4b: Companion white hairline descending from right */}
            <path
              d="M 1630 195 C 1370 330, 1090 545, 784 678 C 585 693, 305 665, -30 610"
              stroke="url(#delicateWhiteGrad2)"
              strokeWidth="0.75"
              strokeLinecap="round"
              opacity="0.60"
            />

            {/* Line 5: Fine translucent white crest curve */}
            <path
              d="M -30 660 C 270 735, 530 645, 780 675 C 1070 635, 1350 685, 1630 670"
              stroke="url(#delicateWhiteGrad1)"
              strokeWidth="0.90"
              strokeLinecap="round"
              opacity="0.75"
            />
          </g>
        </svg>
      </div>

      <div className="contact-master-container">
        <div className="contact-split-grid">
          {/* =================================================================
              LEFT COLUMN: EDITORIAL HEADLINE & CONNECTED STRATEGY STEPS
              ================================================================= */}
          <div className="contact-left-col">
            {/* Top Eyebrow Tag with Bronze Horizontal Line */}
            <div className="contact-eyebrow">
              <span className="contact-eyebrow-text">GET IN TOUCH</span>
              <span className="contact-eyebrow-line" />
            </div>

            {/* Main Editorial Headline */}
            <h1 className="contact-hero-title">
              Let’s discuss <br />
              your digital <br />
              <span className="title-gold-text">growth.</span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="contact-hero-desc">
              Tell us about your organization and what you are trying to achieve. We’ll help you identify the right opportunities and next steps.
            </p>

            {/* 3 Strategic Process Steps with Connected Journey Line */}
            <div className="contact-process-list">
              {/* Vertical Connector Line linking circular badges */}
              <div className="contact-process-line" aria-hidden="true" />

              {/* Step 1: Understand */}
              <div className="contact-process-item">
                <div className="contact-process-badge">
                  <MessageSquare size={18} strokeWidth={1.8} />
                </div>
                <div className="contact-process-content">
                  <h3 className="contact-process-title">Understand</h3>
                  <p className="contact-process-text">We listen to your goals and challenges.</p>
                </div>
              </div>

              {/* Step 2: Strategize */}
              <div className="contact-process-item">
                <div className="contact-process-badge">
                  <Lightbulb size={18} strokeWidth={1.8} />
                </div>
                <div className="contact-process-content">
                  <h3 className="contact-process-title">Strategize</h3>
                  <p className="contact-process-text">We identify the right opportunities.</p>
                </div>
              </div>

              {/* Step 3: Grow Together */}
              <div className="contact-process-item">
                <div className="contact-process-badge">
                  <BarChart3 size={18} strokeWidth={1.8} />
                </div>
                <div className="contact-process-content">
                  <h3 className="contact-process-title">Grow Together</h3>
                  <p className="contact-process-text">We build a clear plan for measurable results.</p>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================================
              RIGHT COLUMN: 54% WIDTH - REFINED LUXURY WHITE FORM CARD
              ================================================================= */}
          <div className="contact-right-col">
            <div className="contact-card">
              {/* Card Eyebrow */}
              <div className="contact-card-badge">
                <span className="contact-card-badge-text">CONTACT sBLOOM</span>
                <span className="contact-card-badge-line" />
              </div>

              {/* Card Headings */}
              <h2 className="contact-card-title">Share a few details</h2>
              <p className="contact-card-subtitle">
                We'll get back to you with the right next steps.
              </p>

              {submitted ? (
                <div className="contact-success-card">
                  <div className="contact-success-icon-wrap">
                    <CheckCircle2 size={32} strokeWidth={2} />
                  </div>
                  <h3 className="contact-success-title">Message Received!</h3>
                  <p className="contact-success-msg">
                    Thank you for reaching out. We have received your details and our team will get back to you with tailored strategic recommendations within 24 hours.
                  </p>
                  <button type="button" className="contact-reset-btn" onClick={handleReset}>
                    Send Another Response
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  {/* Field 1: Full Name */}
                  <div className="contact-field-group">
                    <label htmlFor="fullName" className="contact-field-label">
                      Full Name <span className="contact-req-star">*</span>
                    </label>
                    <div className="contact-input-wrap">
                      <User size={15} strokeWidth={1.8} className="contact-input-icon" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        placeholder="Enter your full name"
                        className="contact-input"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Field 2: Organization Name */}
                  <div className="contact-field-group">
                    <label htmlFor="organization" className="contact-field-label">
                      Organization Name <span className="contact-req-star">*</span>
                    </label>
                    <div className="contact-input-wrap">
                      <Building2 size={15} strokeWidth={1.8} className="contact-input-icon" />
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        required
                        placeholder="Enter your organization name"
                        className="contact-input"
                        value={formData.organization}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Field 3: Email Address */}
                  <div className="contact-field-group">
                    <label htmlFor="email" className="contact-field-label">
                      Email Address <span className="contact-req-star">*</span>
                    </label>
                    <div className="contact-input-wrap">
                      <Mail size={15} strokeWidth={1.8} className="contact-input-icon" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="you@company.com"
                        className="contact-input"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Field 4: Phone Number */}
                  <div className="contact-field-group">
                    <label htmlFor="phone" className="contact-field-label">
                      Phone Number <span className="contact-req-star">*</span>
                    </label>
                    <div className="contact-input-wrap">
                      <Phone size={15} strokeWidth={1.8} className="contact-input-icon" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        className="contact-input"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Field 5: Industry */}
                  <div className="contact-field-group">
                    <label htmlFor="industry" className="contact-field-label">
                      Industry <span className="contact-req-star">*</span>
                    </label>
                    <div className="contact-input-wrap">
                      <LayoutGrid size={15} strokeWidth={1.8} className="contact-input-icon" />
                      <select
                        id="industry"
                        name="industry"
                        required
                        className="contact-select"
                        value={formData.industry}
                        onChange={handleChange}
                      >
                        <option value="">Select an industry...</option>
                        <option value="Education">Education</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Consulting & Professional Services">
                          Consulting & Professional Services
                        </option>
                        <option value="Technology & Software">Technology & Software</option>
                        <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                        <option value="Financial Services">Financial Services</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Field 6: What would you like to improve? (Optional) */}
                  <div className="contact-field-group">
                    <label htmlFor="improve" className="contact-field-label">
                      What would you like to improve? <span className="contact-opt-tag">(Optional)</span>
                    </label>
                    <div className="contact-input-wrap contact-textarea-wrap">
                      <FileText size={15} strokeWidth={1.8} className="contact-input-icon contact-textarea-icon" />
                      <textarea
                        id="improve"
                        name="improve"
                        rows={2}
                        placeholder="Tell us about your goals, challenges, or what you'd like to improve..."
                        className="contact-textarea"
                        value={formData.improve}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="contact-error-banner" role="alert">
                      <AlertCircle size={15} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="contact-submit-btn"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Planning Next Step...' : 'Plan My Next Step'}</span>
                    <ArrowRight size={16} strokeWidth={2.4} className="btn-arrow-icon" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

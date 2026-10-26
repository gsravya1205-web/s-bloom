import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  MapPin, 
  Search, 
  ShieldCheck, 
  Image as ImageIcon, 
  Film, 
  Palette, 
  Calendar, 
  Megaphone, 
  Target, 
  BarChart3,
  Users, 
  ArrowRight,
  ArrowLeft,
  Play,
  Clock,
  Leaf,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  ChevronDown,
  Volume2,
  VolumeX,
  type LucideIcon
} from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';
import './SolutionsPage.css';

interface SolutionsPageProps {
  initialSection?: 'build' | 'create' | 'promote' | 'grow';
}

interface StageData {
  id: 'build' | 'create' | 'promote' | 'grow';
  num: string;
  label: string;
  titlePrimary: string;
  titleAccent: string;
  lead: string;
  ctaText: string;
  ctaLink: string;
  services: Array<{
    title: string;
    desc: string;
    icon: LucideIcon;
  }>;
}

const STAGES: StageData[] = [
  {
    id: 'build',
    num: '01',
    label: 'BUILD',
    titlePrimary: 'Help people find',
    titleAccent: 'your business.',
    lead: 'Build a strong online presence so the right people can discover you and your services.',
    ctaText: 'Build Your Foundation',
    ctaLink: '/contact?interest=build',
    services: [
      {
        title: 'Website Development',
        desc: 'Clean, fast and professional website.',
        icon: Globe,
      },
      {
        title: 'Google Business Profile',
        desc: 'Get found on Google Search & Maps.',
        icon: MapPin,
      },
      {
        title: 'SEO & Search Visibility',
        desc: 'Improve your search rankings.',
        icon: Search,
      },
      {
        title: 'Brand Presence',
        desc: 'Keep your information consistent.',
        icon: ShieldCheck,
      },
    ],
  },
  {
    id: 'create',
    num: '02',
    label: 'CREATE',
    titlePrimary: 'Communicate your expertise with',
    titleAccent: 'engaging content.',
    lead: 'Create content that showcases your expertise and helps you connect with your audience.',
    ctaText: 'Create Your Content',
    ctaLink: '/contact?interest=create',
    services: [
      {
        title: 'Social Media Content',
        desc: 'Plan and create relevant content.',
        icon: ImageIcon,
      },
      {
        title: 'Reels and Videos',
        desc: 'Short, engaging videos.',
        icon: Film,
      },
      {
        title: 'Graphics & Creative Design',
        desc: 'On-brand visuals.',
        icon: Palette,
      },
      {
        title: 'Content Strategy',
        desc: 'Plan and schedule your content.',
        icon: Calendar,
      },
    ],
  },
  {
    id: 'promote',
    num: '03',
    label: 'PROMOTE',
    titlePrimary: 'Reach the people',
    titleAccent: 'who matter.',
    lead: 'Run targeted campaigns to reach the right audience and generate quality leads.',
    ctaText: 'Promote Your Business',
    ctaLink: '/contact?interest=promote',
    services: [
      {
        title: 'Meta Ads',
        desc: 'Reach the right audience.',
        icon: Megaphone,
      },
      {
        title: 'Google Ads',
        desc: 'Show up when people search.',
        icon: Search,
      },
      {
        title: 'Campaign Strategy',
        desc: 'Plan and manage campaigns.',
        icon: Target,
      },
      {
        title: 'Ad Performance',
        desc: 'Track results and improve over time.',
        icon: BarChart3,
      },
    ],
  },
  {
    id: 'grow',
    num: '04',
    label: 'GROW',
    titlePrimary: 'Drive sustainable',
    titleAccent: 'growth.',
    lead: 'Track performance, get insights, and keep improving your digital presence.',
    ctaText: 'Talk to sBLOOM About Growth',
    ctaLink: '/contact',
    services: [
      {
        title: 'Performance Tracking',
        desc: 'Monitor key metrics.',
        icon: BarChart3,
      },
      {
        title: 'Insights & Reporting',
        desc: "Understand what's working.",
        icon: Clock,
      },
      {
        title: 'Strategy & Improvements',
        desc: 'Find new opportunities.',
        icon: Users,
      },
      {
        title: 'Ongoing Support',
        desc: 'Continuous guidance.',
        icon: Leaf,
      },
    ],
  },
];

export const SolutionsOverviewPage: React.FC<SolutionsPageProps> = ({ initialSection }) => {
  const location = useLocation();
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);

  const activeStage = STAGES[activeIdx];

  // State & Ref for Promote Section Video (IMG_3694.mp4)
  const [isPromoteMuted, setIsPromoteMuted] = useState(true);
  const [isPromotePlaying, setIsPromotePlaying] = useState(true);
  const promoteVideoRef = useRef<HTMLVideoElement>(null);

  const togglePromoteMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (promoteVideoRef.current) {
      promoteVideoRef.current.muted = !promoteVideoRef.current.muted;
      setIsPromoteMuted(promoteVideoRef.current.muted);
    }
  };

  const togglePromotePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (promoteVideoRef.current) {
      if (promoteVideoRef.current.paused) {
        promoteVideoRef.current.play().catch(() => {});
        setIsPromotePlaying(true);
      } else {
        promoteVideoRef.current.pause();
        setIsPromotePlaying(false);
      }
    }
  };

  // Switch to a specific stage directly without scrolling
  const goToStage = (newIdx: number) => {
    if (newIdx < 0 || newIdx >= STAGES.length) return;
    setDirection(newIdx > activeIdx ? 1 : -1);
    setActiveIdx(newIdx);

    // Update URL hash smoothly
    const stageId = STAGES[newIdx].id;
    if (window.location.hash !== `#${stageId}`) {
      window.history.replaceState(null, '', `#${stageId}`);
    }
  };

  // Sync with URL hash or initialSection prop
  useEffect(() => {
    const hash = (initialSection || location.hash.replace('#', '')).toLowerCase();
    const foundIdx = STAGES.findIndex((s) => s.id === hash);
    if (foundIdx !== -1) {
      goToStage(foundIdx);
    }
  }, [initialSection, location.hash]);

  // Smooth micro-transition between stages
  const pageVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? 18 : -18,
      opacity: 0,
      scale: 0.99,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.32,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: (dir: number) => ({
      y: dir > 0 ? -18 : 18,
      opacity: 0,
      scale: 0.99,
      transition: {
        duration: 0.22,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <div className="sol-page">
      {/* Background ambient warmth */}
      <div className="sol-bg-mesh" aria-hidden="true" />

      {/* =================================================================
         1. HERO INTRO
         ================================================================= */}
      <section className="sol-hero-intro">
        <div className="sol-container">
          <ScrollReveal delay={0}>
            <div className="sol-eyebrow-wrap">
              <span className="sol-eyebrow-line" />
              <span className="sol-eyebrow">OUR SOLUTIONS</span>
              <span className="sol-eyebrow-line" />
            </div>
            <h1 className="sol-hero-title">
              From Foundational Setup to{' '}
              <span className="sol-title-accent">Sustainable Growth.</span>
            </h1>
            <p className="sol-hero-desc">
              We help good businesses become discoverable, trusted, and chosen through a structured, four-phase digital process.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
         2. SOLUTIONS PRESENTATION SECTION (IN-PLACE, NO SCROLL HIJACKING)
         ================================================================= */}
      <div className="sol-presentation-wrap">
        <div className="sol-viewport">
          <div className="sol-container">
            {/* =============================================================
               3. PILL SWITCHER NAV (BUILD, CREATE, PROMOTE, GROW) — MATCHING IMAGE 1
               ============================================================= */}
            <div className="sol-pill-nav-wrap">
              <div className="sol-pill-nav" role="tablist" aria-label="Solutions Stages">
                {STAGES.map((stg, idx) => {
                  const isActive = activeIdx === idx;
                  const displayLabel = stg.label.charAt(0) + stg.label.slice(1).toLowerCase();

                  return (
                    <button
                      key={stg.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`sol-pill-tab-btn ${isActive ? 'active' : ''}`}
                      onClick={() => goToStage(idx)}
                    >
                      {isActive && (
                        <div className="sol-pill-sprout" aria-hidden="true">
                          <svg viewBox="0 0 34 26" fill="none" className="sol-sprout-svg">
                            <path
                              d="M10 22 C9 13 3 10 1 13 C-1 16 2 20 8 19 C10 19 10 21 10 22 Z"
                              fill="#4D9B77"
                            />
                            <path
                              d="M13 22 C13 10 18 3 26 4 C29 5 28 11 22 13 C17 15 14 18 13 22 Z"
                              fill="#66BC94"
                            />
                            <path
                              d="M11 22 C10 13 8 2 15 1 C19 1 19 6 16 12 C14 17 12 20 11 22 Z"
                              fill="#3B8160"
                            />
                          </svg>
                        </div>
                      )}
                      <span>{displayLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* =============================================================
               4. THE PRESENTATION CARD (COMPACT HEIGHT & ZERO ARROWS)
               ============================================================= */}
            <div className="sol-page-card-wrapper">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeStage.id}
                  custom={direction}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={`sol-page-card sol-card-${activeStage.id}`}
                >
                  <div className="sol-card-top-bar" aria-hidden="true" />
                  
                  <div className="sol-card-grid">
                    {/* Left Column: Eyebrow badge, Headline, Lead, 4 Services */}
                    <div className="sol-card-content">
                      <div className="sol-card-badge-row">
                        <div className="sol-card-step-num">{activeStage.num}</div>
                        <span className="sol-card-tag">{activeStage.label}</span>
                        <span className="sol-badge-dash" />
                      </div>
                      
                      <h2 className="sol-card-headline">
                        {activeStage.titlePrimary}{' '}
                        <span className="sol-card-headline-accent">{activeStage.titleAccent}</span>
                      </h2>
                      <p className="sol-card-lead">{activeStage.lead}</p>

                      <div className="sol-service-list">
                        {activeStage.services.map((svc, i) => {
                          const IconComp = svc.icon;
                          return (
                            <div key={i} className="sol-service-item">
                              <div className="sol-service-icon-box">
                                <IconComp size={16} strokeWidth={2.1} />
                              </div>
                              <div className="sol-service-text-wrap">
                                <h3 className="sol-service-title">{svc.title}</h3>
                                <p className="sol-service-desc">{svc.desc}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {activeStage.id !== 'grow' && (
                        <Link to={activeStage.ctaLink} className="sol-card-cta-btn">
                          <span>{activeStage.ctaText}</span>
                          <ArrowRight size={16} strokeWidth={2.4} />
                        </Link>
                      )}
                    </div>

                    {/* Right Column: Tailored Pure CSS Visual Panels (Zero Images) */}
                    <div className="sol-card-visual-wrap">
                      {/* SECTION 01 — BUILD: Website preview + GBP card + Local visibility */}
                      {activeStage.id === 'build' && (
                        <div className="sol-mock-build">
                          {/* Browser Window Card */}
                          <div className="sol-browser-card">
                            <div className="sol-browser-bar">
                              <div className="sol-dot-group">
                                <span className="sol-dot dot-red" />
                                <span className="sol-dot dot-yellow" />
                                <span className="sol-dot dot-green" />
                              </div>
                              <div className="sol-browser-nav">
                                <span className="nav-item active">Home</span>
                                <span className="nav-item">About</span>
                                <span className="nav-item">Services</span>
                                <span className="nav-item">Contact</span>
                              </div>
                            </div>
                            <div className="sol-browser-body">
                              <div className="sol-browser-left">
                                <h4 className="sol-browser-heading">Your Services, Clearly</h4>
                                <div className="sol-wire-line w-85" />
                                <div className="sol-wire-line w-65" />
                                <div className="sol-wire-line w-45" />
                                <div className="sol-browser-btn-pill" />
                              </div>
                              <div className="sol-browser-right">
                                <div className="sol-browser-preview-box" />
                              </div>
                            </div>
                          </div>

                          {/* Overlapping Floating Google Business Profile Card */}
                          <motion.div 
                            className="sol-float-gbp"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            <div className="sol-gbp-header">
                              <div className="sol-google-icon-wrap">
                                <svg viewBox="0 0 24 24" width="18" height="18">
                                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.4 7.33 24 12 24z"/>
                                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.94 0 12s.45 3.84 1.24 5.42l4.04-3.15z"/>
                                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.6 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                                </svg>
                              </div>
                              <div>
                                <div className="sol-gbp-title">Your Business</div>
                                <div className="sol-gbp-rating">
                                  <span className="sol-gbp-num">4.9</span>
                                  <span className="sol-gbp-stars">★★★★★</span>
                                  <span className="sol-gbp-reviews">(120+)</span>
                                </div>
                              </div>
                            </div>
                            <div className="sol-gbp-row">
                              <MapPin size={13} className="sol-gbp-icon" />
                              <div className="sol-wire-line w-75" />
                            </div>
                            <div className="sol-gbp-row">
                              <Globe size={13} className="sol-gbp-icon" />
                              <div className="sol-wire-line w-55" />
                            </div>
                          </motion.div>

                          {/* Overlapping Floating Local Visibility Card */}
                          <motion.div 
                            className="sol-float-vis"
                            animate={{ y: [0, 4, 0] }}
                            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                          >
                            <div className="sol-vis-icon-wrap">
                              <BarChart3 size={18} strokeWidth={2.4} />
                            </div>
                            <div>
                              <div className="sol-vis-label">Local Visibility</div>
                              <span className="sol-vis-arrow">↗</span>
                            </div>
                          </motion.div>
                        </div>
                      )}

                      {/* SECTION 02 — CREATE: Content Calendar + Social Post + Platform Badges */}
                      {activeStage.id === 'create' && (
                        <div className="sol-mock-create">
                          {/* Content Calendar Top Card */}
                          <div className="sol-calendar-card">
                            <div className="sol-calendar-header">
                              <Calendar size={15} className="sol-cal-head-icon" />
                              <span>Content Calendar</span>
                            </div>
                            <div className="sol-calendar-days">
                              <div className="sol-cal-day-col">
                                <span className="sol-cal-day-label">Mon</span>
                                <div className="sol-cal-tile tile-photo">
                                  <ImageIcon size={15} />
                                </div>
                              </div>
                              <div className="sol-cal-day-col">
                                <span className="sol-cal-day-label">Tue</span>
                                <div className="sol-cal-tile tile-video active">
                                  <Play size={14} fill="currentColor" strokeWidth={0} />
                                </div>
                              </div>
                              <div className="sol-cal-day-col">
                                <span className="sol-cal-day-label">Wed</span>
                                <div className="sol-cal-tile tile-carousel">
                                  <div className="sol-caro-bar" />
                                  <div className="sol-caro-bar" />
                                  <div className="sol-caro-bar" />
                                </div>
                              </div>
                              <div className="sol-cal-day-col">
                                <span className="sol-cal-day-label">Thu</span>
                                <div className="sol-cal-tile tile-photo">
                                  <ImageIcon size={15} />
                                </div>
                              </div>
                              <div className="sol-cal-day-col">
                                <span className="sol-cal-day-label">Fri</span>
                                <div className="sol-cal-tile tile-more">
                                  <span>•••</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Floating Social Media Post Card */}
                          <motion.div 
                            className="sol-float-post"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            <div className="sol-post-header">
                              <div className="sol-post-avatar" />
                              <div className="sol-post-user-info">
                                <div className="sol-wire-line w-45" />
                                <div className="sol-wire-line w-30" />
                              </div>
                            </div>
                            <div className="sol-post-frame">
                              <div className="sol-post-frame-inner" />
                            </div>
                            <div className="sol-post-actions">
                              <div className="sol-post-actions-left">
                                <Heart size={15} className="sol-action-icon active-heart" />
                                <MessageCircle size={15} className="sol-action-icon" />
                                <Send size={15} className="sol-action-icon" />
                              </div>
                              <Bookmark size={15} className="sol-action-icon" />
                            </div>
                          </motion.div>

                          {/* Floating Platform Pills Stack on Right */}
                          <div className="sol-platform-stack">
                            <div className="sol-plat-btn plat-ig" title="Instagram">
                              <div className="sol-ig-glyph" />
                            </div>
                            <div className="sol-plat-btn plat-yt" title="YouTube">
                              <Play size={11} fill="#fff" strokeWidth={0} />
                            </div>
                            <div className="sol-plat-btn plat-li" title="LinkedIn">
                              <span>in</span>
                            </div>
                            <div className="sol-plat-btn plat-fb" title="Facebook">
                              <span>f</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SECTION 03 — PROMOTE: Only the Video Displayed (IMG_3694.mp4) */}
                      {activeStage.id === 'promote' && (
                        <div className="sol-mock-promote sol-video-only-view">
                          <div 
                            className="sol-promote-video-box"
                            onClick={togglePromotePlay}
                            title={isPromotePlaying ? "Click to pause" : "Click to play"}
                            style={{ cursor: 'pointer' }}
                          >
                            <video
                              ref={promoteVideoRef}
                              src="/IMG_3694.mp4"
                              autoPlay
                              muted={isPromoteMuted}
                              loop
                              playsInline
                              className="sol-promote-video-element"
                            />

                            {/* Floating Sound Toggle Button */}
                            <button
                              type="button"
                              onClick={togglePromoteMute}
                              className="sol-video-sound-floating-btn"
                              aria-label={isPromoteMuted ? "Unmute audio" : "Mute audio"}
                              title={isPromoteMuted ? "Unmute" : "Mute"}
                            >
                              {isPromoteMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* SECTION 04 — GROW: Performance Card + Channels + Growth Trend */}
                      {activeStage.id === 'grow' && (
                        <div className="sol-mock-grow">
                          {/* Top: Website Performance Card */}
                          <div className="sol-perf-card">
                            <div className="sol-perf-header">
                              <span className="sol-perf-title">Website Performance</span>
                              <div className="sol-dropdown-badge">
                                <span>Last 30 Days</span>
                                <ChevronDown size={12} />
                              </div>
                            </div>

                            <div className="sol-stats-row">
                              <div className="sol-stat-cell">
                                <div className="sol-stat-val">12.4K</div>
                                <div className="sol-stat-lbl">Visitors</div>
                                <div className="sol-stat-delta">↑ 28%</div>
                              </div>
                              <div className="sol-stat-cell">
                                <div className="sol-stat-val">3.1K</div>
                                <div className="sol-stat-lbl">Page Views</div>
                                <div className="sol-stat-delta">↑ 32%</div>
                              </div>
                              <div className="sol-stat-cell">
                                <div className="sol-stat-val">284</div>
                                <div className="sol-stat-lbl">Leads</div>
                                <div className="sol-stat-delta">↑ 45%</div>
                              </div>
                            </div>

                            {/* Smooth SVG Line Chart */}
                            <div className="sol-chart-area">
                              <svg viewBox="0 0 320 80" className="sol-smooth-chart" fill="none">
                                <defs>
                                  <linearGradient id="chartGradGrow" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#C9952E" stopOpacity="0.35" />
                                    <stop offset="100%" stopColor="#C9952E" stopOpacity="0.0" />
                                  </linearGradient>
                                </defs>
                                <path
                                  d="M 10,65 Q 50,60 95,52 T 180,42 T 250,22 T 310,10 L 310,80 L 10,80 Z"
                                  fill="url(#chartGradGrow)"
                                />
                                <path
                                  d="M 10,65 Q 50,60 95,52 T 180,42 T 250,22 T 310,10"
                                  stroke="#C9952E"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                />
                                <circle cx="10" cy="65" r="3.5" fill="#C9952E" />
                                <circle cx="95" cy="52" r="3.5" fill="#C9952E" />
                                <circle cx="180" cy="42" r="3.5" fill="#C9952E" />
                                <circle cx="250" cy="22" r="3.5" fill="#C9952E" />
                                <circle cx="310" cy="10" r="4.5" fill="#C9952E" stroke="#FFFCF7" strokeWidth="2" />
                              </svg>
                            </div>
                          </div>

                          {/* Bottom Row: Top Channels + Growth Trend */}
                          <div className="sol-grow-split-row">
                            {/* Left: Top Channels */}
                            <div className="sol-channels-card">
                              <div className="sol-chan-title">Top Channels</div>
                              <div className="sol-chan-list">
                                <div className="sol-chan-item">
                                  <div className="sol-chan-name">
                                    <Search size={12} className="sol-chan-icon icon-search" />
                                    <span>Organic Search</span>
                                  </div>
                                  <div className="sol-chan-bar-track">
                                    <div className="sol-chan-bar-fill" style={{ width: '45%' }} />
                                  </div>
                                  <span className="sol-chan-pct">45%</span>
                                </div>

                                <div className="sol-chan-item">
                                  <div className="sol-chan-name">
                                    <div className="sol-gads-mini-icon">▲</div>
                                    <span>Google Ads</span>
                                  </div>
                                  <div className="sol-chan-bar-track">
                                    <div className="sol-chan-bar-fill" style={{ width: '28%' }} />
                                  </div>
                                  <span className="sol-chan-pct">28%</span>
                                </div>

                                <div className="sol-chan-item">
                                  <div className="sol-chan-name">
                                    <div className="sol-ig-mini-icon" />
                                    <span>Social Media</span>
                                  </div>
                                  <div className="sol-chan-bar-track">
                                    <div className="sol-chan-bar-fill" style={{ width: '20%' }} />
                                  </div>
                                  <span className="sol-chan-pct">20%</span>
                                </div>

                                <div className="sol-chan-item">
                                  <div className="sol-chan-name">
                                    <Globe size={12} className="sol-chan-icon icon-direct" />
                                    <span>Direct</span>
                                  </div>
                                  <div className="sol-chan-bar-track">
                                    <div className="sol-chan-bar-fill" style={{ width: '7%' }} />
                                  </div>
                                  <span className="sol-chan-pct">7%</span>
                                </div>
                              </div>
                            </div>

                            {/* Right: Growth Trend ascending bars */}
                            <div className="sol-trend-card">
                              <div className="sol-trend-title">Growth Trend</div>
                              <div className="sol-trend-bars">
                                <div className="sol-trend-bar" style={{ height: '28%' }} />
                                <div className="sol-trend-bar" style={{ height: '38%' }} />
                                <div className="sol-trend-bar" style={{ height: '48%' }} />
                                <div className="sol-trend-bar" style={{ height: '56%' }} />
                                <div className="sol-trend-bar" style={{ height: '68%' }} />
                                <div className="sol-trend-bar" style={{ height: '80%' }} />
                                <div className="sol-trend-bar active" style={{ height: '100%' }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* =============================================================
               5. PAGE CONTROLS BAR (PREV / NEXT & PAGE COUNTER)
               ============================================================= */}
            <div className="sol-page-controls-bar">
              <div className="sol-page-indicator">
                <span>Phase <strong>{activeIdx + 1}</strong> of <strong>4</strong>:</span>
                <span className="sol-indicator-label">{activeStage.label}</span>
              </div>

              <div className="sol-page-arrows">
                <button
                  type="button"
                  className="sol-page-arrow-btn"
                  onClick={() => goToStage(activeIdx - 1)}
                  disabled={activeIdx === 0}
                  aria-label="Previous Phase"
                >
                  <ArrowLeft size={15} />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  className="sol-page-arrow-btn"
                  onClick={() => goToStage(activeIdx + 1)}
                  disabled={activeIdx === STAGES.length - 1}
                  aria-label="Next Phase"
                >
                  <span>Next</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsOverviewPage;

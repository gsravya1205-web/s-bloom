import React from 'react';
import { PenTool, Film, FileText, MonitorSmartphone } from 'lucide-react';
import './CreativeOrbit.css';

export const CreativeOrbit: React.FC = () => {
  return (
    <div className="co-wrapper">
      <div className="co-radial-glow"></div>
      
      {/* Outer Dashed Ring */}
      <div className="co-outer-ring">
        {/* Left: Design */}
        <div className="co-node co-node-design">
          <div className="co-node-content">
            <div className="co-icon-box"><PenTool size={20} /></div>
            <span className="co-label">DESIGN</span>
          </div>
        </div>
        {/* Right: Video */}
        <div className="co-node co-node-video">
          <div className="co-node-content">
            <div className="co-icon-box"><Film size={20} /></div>
            <span className="co-label">VIDEO</span>
          </div>
        </div>
        {/* Subtle celestial gold beads matching reference design */}
        <div className="co-bead co-bead-top-right" />
        <div className="co-bead co-bead-bottom" />
      </div>

      {/* Inner Solid Ring */}
      <div className="co-inner-ring">
        {/* Top-Right: Content */}
        <div className="co-node co-node-content-pos">
          <div className="co-node-content">
            <div className="co-icon-box"><FileText size={20} /></div>
            <span className="co-label">CONTENT</span>
          </div>
        </div>
        {/* Bottom-Left: Digital */}
        <div className="co-node co-node-digital-pos">
          <div className="co-node-content">
            <div className="co-icon-box"><MonitorSmartphone size={20} /></div>
            <span className="co-label">DIGITAL</span>
          </div>
        </div>
      </div>

      {/* Central Element */}
      <div className="co-center-element">
        <span className="co-center-text">sBLOOM</span>
      </div>
    </div>
  );
};

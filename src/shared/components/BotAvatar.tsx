import React from 'react';

interface BotAvatarProps {
  isSpeaking?: boolean;
  className?: string;
}

export const BotAvatar: React.FC<BotAvatarProps> = ({ isSpeaking = false, className = '' }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`bot-avatar ${className}`}
    aria-label="Avatar del asistente virtual"
    role="img"
  >
    {/* Robot head */}
    <circle 
      cx="50" 
      cy="50" 
      r="35" 
      fill="url(#avatarGradient)" 
      className="bot-avatar__head"
    />
    
    {/* Eyes - con animación de parpadeo */}
    <g className="bot-avatar__eyes">
      <circle cx="40" cy="45" r="5" fill="#ffffff" />
      <circle cx="60" cy="45" r="5" fill="#ffffff" />
      <circle 
        cx="41" 
        cy="45" 
        r="3" 
        fill="currentColor"
        className="bot-avatar__pupil"
        style={{ color: '#1e40af' }}
      />
      <circle 
        cx="61" 
        cy="45" 
        r="3" 
        fill="currentColor"
        className="bot-avatar__pupil"
        style={{ color: '#1e40af' }}
      />
    </g>
    
    {/* Smile - más expresivo */}
    <path
      d="M 35 60 Q 50 68 65 60"
      stroke="#ffffff"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
      className="bot-avatar__smile"
    />
    
    {/* Antenna con animación */}
    <g className="bot-avatar__antenna">
      <line x1="50" y1="15" x2="50" y2="8" stroke="#ffffff" strokeWidth="2" />
      <circle 
        cx="50" 
        cy="6" 
        r="3" 
        fill="#fbbf24"
        className={isSpeaking ? 'bot-avatar__antenna-light--active' : ''}
      />
    </g>
    
    {/* Ears/Sensors con animación cuando habla */}
    <circle 
      cx="20" 
      cy="50" 
      r="6" 
      fill="#60a5fa" 
      opacity="0.8"
      className={isSpeaking ? 'bot-avatar__sensor--active' : ''}
    />
    <circle 
      cx="80" 
      cy="50" 
      r="6" 
      fill="#60a5fa" 
      opacity="0.8"
      className={isSpeaking ? 'bot-avatar__sensor--active' : ''}
    />
    
    {/* Ondas de sonido cuando habla - para personas sordomudas */}
    {isSpeaking && (
      <g className="bot-avatar__sound-waves">
        <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" className="bot-avatar__wave" />
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" className="bot-avatar__wave bot-avatar__wave--delay" />
      </g>
    )}
    
    <defs>
      <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1e40af" />
      </linearGradient>
    </defs>
    
    <style>{`
      .bot-avatar__head {
        transition: transform 0.3s ease;
      }
      @media (prefers-reduced-motion: no-preference) {
        .bot-avatar:hover .bot-avatar__head {
          transform: scale(1.05);
        }
        .bot-avatar__pupil {
          animation: blink 3s infinite;
        }
        .bot-avatar__antenna-light--active {
          animation: pulse-glow 1.5s ease-in-out infinite;
        }
        .bot-avatar__sensor--active {
          animation: sensor-pulse 1s ease-in-out infinite;
        }
        .bot-avatar__wave {
          animation: wave-expand 2s ease-out infinite;
        }
        .bot-avatar__wave--delay {
          animation-delay: 0.5s;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .bot-avatar__pupil,
        .bot-avatar__antenna-light--active,
        .bot-avatar__sensor--active,
        .bot-avatar__wave {
          animation: none;
        }
        .bot-avatar__antenna-light--active {
          opacity: 0.8;
        }
        .bot-avatar__sensor--active {
          opacity: 1;
        }
      }
      @keyframes blink {
        0%, 90%, 100% { opacity: 1; }
        95% { opacity: 0.3; }
      }
      @keyframes pulse-glow {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.2); }
      }
      @keyframes sensor-pulse {
        0%, 100% { opacity: 0.8; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.1); }
      }
      @keyframes wave-expand {
        0% { opacity: 0.3; transform: scale(0.9); }
        100% { opacity: 0; transform: scale(1.2); }
      }
      .dark-mode .bot-avatar__pupil {
        color: #60a5fa !important;
      }
      .high-contrast .bot-avatar__head {
        fill: #0000ff !important;
      }
      .high-contrast .bot-avatar__pupil {
        color: #ffffff !important;
      }
      .high-contrast .bot-avatar__smile {
        stroke: #ffffff !important;
        stroke-width: 4px !important;
      }
    `}</style>
  </svg>
);

export const BotAvatarSmall: React.FC<BotAvatarProps> = ({ isSpeaking = false, className = '' }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`bot-avatar bot-avatar--small ${className}`}
    aria-label="Avatar del asistente virtual"
    role="img"
  >
    <circle 
      cx="20" 
      cy="20" 
      r="16" 
      fill="url(#avatarGradientSmall)"
      className="bot-avatar__head"
    />
    <g className="bot-avatar__eyes">
      <circle cx="15" cy="18" r="2" fill="#ffffff" />
      <circle cx="25" cy="18" r="2" fill="#ffffff" />
      <circle 
        cx="15.5" 
        cy="18" 
        r="1.2" 
        fill="currentColor"
        className="bot-avatar__pupil"
        style={{ color: '#1e40af' }}
      />
      <circle 
        cx="25.5" 
        cy="18" 
        r="1.2" 
        fill="currentColor"
        className="bot-avatar__pupil"
        style={{ color: '#1e40af' }}
      />
    </g>
    <path
      d="M 13 25 Q 20 28 27 25"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      className="bot-avatar__smile"
    />
    {isSpeaking && (
      <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3" className="bot-avatar__wave" />
    )}
    <defs>
      <linearGradient id="avatarGradientSmall" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1e40af" />
      </linearGradient>
    </defs>
    <style>{`
      @media (prefers-reduced-motion: no-preference) {
        .bot-avatar--small .bot-avatar__pupil {
          animation: blink 3s infinite;
        }
        .bot-avatar--small .bot-avatar__wave {
          animation: wave-expand 2s ease-out infinite;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .bot-avatar--small .bot-avatar__pupil,
        .bot-avatar--small .bot-avatar__wave {
          animation: none;
        }
      }
      @keyframes wave-expand {
        0% { opacity: 0.3; transform: scale(0.9); }
        100% { opacity: 0; transform: scale(1.2); }
      }
      .dark-mode .bot-avatar--small .bot-avatar__pupil {
        color: #60a5fa !important;
      }
      .high-contrast .bot-avatar--small .bot-avatar__head {
        fill: #0000ff !important;
      }
      .high-contrast .bot-avatar--small .bot-avatar__pupil {
        color: #ffffff !important;
      }
      .high-contrast .bot-avatar--small .bot-avatar__smile {
        stroke: #ffffff !important;
        stroke-width: 3px !important;
      }
    `}</style>
  </svg>
);

import React from 'react';
import { BotAvatar } from './BotAvatar';

export const AppAvatar: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`app-avatar ${className}`}>
      <BotAvatar />
    </div>
  );
};

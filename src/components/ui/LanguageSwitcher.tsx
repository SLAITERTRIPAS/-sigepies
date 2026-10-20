import React from 'react';
import { LanguageDropdown } from './LanguageDropdown';

export const LanguageSwitcher: React.FC<{ user?: any; compact?: boolean }> = ({ user, compact = false }) => {
  return <LanguageDropdown user={user} compact={compact} />;
};

export default LanguageSwitcher;

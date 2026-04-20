// File Path: src/contexts/CookieConsentContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentContextType {
  showBanner: boolean;
  showModal: boolean;
  preferences: CookiePreferences;
  hasConsented: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: CookiePreferences) => void;
  openModal: () => void;
  closeModal: () => void;
  closeBanner: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always true, cannot be disabled
  functional: false,
  analytics: false,
  marketing: false,
};

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const savedPreferences = localStorage.getItem('cookie_preferences');
    const savedConsent = localStorage.getItem('cookie_consent');
    
    if (savedPreferences && savedConsent) {
      setPreferences(JSON.parse(savedPreferences));
      setHasConsented(true);
      setShowBanner(false);
    } else {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    
    setPreferences(allAccepted);
    setHasConsented(true);
    setShowBanner(false);
    setShowModal(false);
    
    localStorage.setItem('cookie_preferences', JSON.stringify(allAccepted));
    localStorage.setItem('cookie_consent', 'true');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    
    // Set cookies based on preferences
    setCookiesBasedOnPreferences(allAccepted);
  };

  const rejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    
    setPreferences(onlyNecessary);
    setHasConsented(true);
    setShowBanner(false);
    setShowModal(false);
    
    localStorage.setItem('cookie_preferences', JSON.stringify(onlyNecessary));
    localStorage.setItem('cookie_consent', 'true');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    
    // Remove non-necessary cookies
    setCookiesBasedOnPreferences(onlyNecessary);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    const finalPrefs = { ...prefs, necessary: true }; // Ensure necessary is always true
    
    setPreferences(finalPrefs);
    setHasConsented(true);
    setShowBanner(false);
    setShowModal(false);
    
    localStorage.setItem('cookie_preferences', JSON.stringify(finalPrefs));
    localStorage.setItem('cookie_consent', 'true');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    
    setCookiesBasedOnPreferences(finalPrefs);
  };

  const setCookiesBasedOnPreferences = (prefs: CookiePreferences) => {
    // Remove non-necessary cookies if not consented
    if (!prefs.functional) {
      // Remove functional cookies
      localStorage.removeItem('user_preferences');
      localStorage.removeItem('language_preference');
    }
    
    if (!prefs.analytics) {
      // Remove analytics cookies
      localStorage.removeItem('analytics_id');
      // Remove Google Analytics cookies if present
      document.cookie = '_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = '_ga_*=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    
    if (!prefs.marketing) {
      // Remove marketing cookies
      localStorage.removeItem('marketing_id');
      document.cookie = '_fbp=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const closeBanner = () => setShowBanner(false);

  return (
    <CookieConsentContext.Provider
      value={{
        showBanner,
        showModal,
        preferences,
        hasConsented,
        acceptAll,
        rejectAll,
        savePreferences,
        openModal,
        closeModal,
        closeBanner,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
}
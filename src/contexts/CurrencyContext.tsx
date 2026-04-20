"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

export const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  // { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
];

// Exchange rates from USD (base currency)
const EXCHANGE_RATES = {
  'USD': 1,        // Base currency
  'CZK': 21.12,    // 1 USD = 21.12 Czech Koruna
  'EUR': 0.86      // 1 USD = 0.86 EUR
};

interface CurrencyContextType {
  currentCurrency: Currency;
  setCurrentCurrency: (currency: Currency) => void;
  convertPrice: (price: number) => number;
  formatPrice: (price: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(currencies[0]); // Default to USD

  // Load saved currency preference
  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      const currency = currencies.find(c => c.code === savedCurrency);
      if (currency) {
        setCurrentCurrency(currency);
      }
    }
  }, []);

  // Save currency preference when changed
  const handleSetCurrentCurrency = (currency: Currency) => {
    setCurrentCurrency(currency);
    localStorage.setItem('selectedCurrency', currency.code);
  };

  // Convert price from USD to selected currency
  const convertPrice = (priceInUSD: number): number => {
    const rate = EXCHANGE_RATES[currentCurrency.code as keyof typeof EXCHANGE_RATES];
    return priceInUSD * rate;
  };

  // Format price with currency symbol
  const formatPrice = (priceInUSD: number): string => {
    const convertedPrice = convertPrice(priceInUSD);
    
    // Format number with appropriate decimals
    const formatted = convertedPrice.toLocaleString('en-US', {
      minimumFractionDigits: currentCurrency.code === 'CZK' ? 0 : 2,
      maximumFractionDigits: currentCurrency.code === 'CZK' ? 0 : 2,
    });
    
    // Position symbol based on currency
    if (currentCurrency.code === 'CZK') {
      return `${formatted} ${currentCurrency.symbol}`;
    } else {
      return `${currentCurrency.symbol}${formatted}`;
    }
  };

  const value: CurrencyContextType = {
    currentCurrency,
    setCurrentCurrency: handleSetCurrentCurrency,
    convertPrice,
    formatPrice,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
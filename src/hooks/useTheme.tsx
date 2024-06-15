import React, { Component } from 'react';
import { useMemo } from 'react';
import { setupColors } from '../components/utils/commonUtils';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Meta, Story } from '@storybook/react';

export type Color = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export type PrimitiveTheme = {
  primary?: Omit<Color, 900 | 800 | 700 | 600>;
  secondary?: Pick<Color, 500>;
  accent?: Pick<Color, 500 | 400>;
};

export function generateTheme({ primary, secondary, accent }: PrimitiveTheme) {
  const theme = {
    primary: {
      500: setupColors('#1A3AE5'),
      400: setupColors('#4961E2'),
      300: setupColors('#8C9CF1'),
      200: setupColors('#C5CDF8'),
      100: setupColors('#E9ECFD'),
      50: setupColors('#F3F5FD'),
    },
    secondary: {
      500: setupColors('#39499b'),
    },
    accent: {
      500: setupColors('#c3f35c'),
      400: setupColors('#77bc1f'),
    },
  };
  if (document) {
    document.documentElement.style.setProperty(
      '--primary-50',
      theme.primary[50]
    );
    document.documentElement.style.setProperty(
      '--primary-100',
      theme.primary[100]
    );
    document.documentElement.style.setProperty(
      '--primary-200',
      theme.primary[200]
    );
    document.documentElement.style.setProperty(
      '--primary-300',
      theme.primary[300]
    );
    document.documentElement.style.setProperty(
      '--primary-400',
      theme.primary[400]
    );
    document.documentElement.style.setProperty(
      '--primary-500',
      theme.primary[500]
    );
    // secondary
    document.documentElement.style.setProperty(
      '--secondary-500',
      theme.secondary[500]
    );
    // accent
    document.documentElement.style.setProperty(
      '--accent-400',
      theme.accent[400]
    );
    document.documentElement.style.setProperty(
      '--accent-500',
      theme.accent[500]
    );
  }

  return theme;
}

const ThemeContext = React.createContext<PrimitiveTheme>({
  primary: {
    500: '#1A3AE5',
    400: '#4961E2',
    300: '#8C9CF1',
    200: '#C5CDF8',
    100: '#E9ECFD',
    50: '#F3F5FD',
  },
  secondary: {
    500: '#39499b',
  },
  accent: {
    500: '#c3f35c',
    400: '#77bc1f',
  },
});

export function useTheme() {
  return React.useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useMemo(() => generateTheme({}), []);
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

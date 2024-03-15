import { manrope, nunitoSans } from '@/app/fonts';
import { DefaultTheme } from 'styled-components';

export const theme = {
  colors: {
    bg: {
      dark1: '#000B37',
      dark2: '#001541',
      card: 'rgba(255, 255, 255, 0.1)',
      white: '#FFFFFF',
    },
    main: {
      linear: 'linear-gradient(90deg, #3AB4E1 0%, #22DADC 100%)',
      blue: '#3AB5E1',
    },
    text: {
      white: '#ffffff',
      headering: 'linear-gradient(90deg, #FFF 0%, #ABB0C4 100%)',
      grey: '#9EA7A7',
      blue: '#3AB5E1',
    },
    icon: {
      inactive: '#2D3C5C',
      active: '#3AB5E1',
    },
    button: {
      default: 'linear-gradient(90deg, #3CB1E1 0%, #21DBDB 100%);',
      hover: 'linear-gradient(90deg, #32A7D7 0%, #0DC7C7 100%)',
      pressed: 'linear-gradient(90deg, #1E93C3 0%, #00B3B3 100%)',
      disabled: '#C1D7E0',
    },
    stroke: {
      grey: 'rgba(208, 208, 208, 0.10)',
      default: '#22DBDC',
      hover: '#0EC7C8',
      pressed: '#00B3B4',
      disabled: '#C1D7E0',
    },
  },
  spacings: {
    headering: '40px',
    headering1: '32px',
  },
  fonts: {
    manrope: manrope.style.fontFamily,
    nunitoSans: nunitoSans.style.fontFamily,
  },
} as const;

export type CustomTheme = typeof theme;

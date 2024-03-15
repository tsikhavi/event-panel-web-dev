import { Nunito_Sans } from 'next/font/google';
import { Manrope } from 'next/font/google';

export const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const nunitoSans = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

import { Colors, defaultColors } from './tokens/colors';
import { FontFace, NunitoSansBold, NunitoSansLight, NunitoSansRegular, NunitoSansSemiBold } from './tokens/fonts';
import { Shadows, shadows } from './tokens/shadows';
import { Typography, typography, TypographyDefinition } from './tokens/typography';

export type Theme = {
  fontFaces: FontFace[];
  colors: Record<Colors, string>;
  shadows: Record<Shadows, string>;
  typography: Record<Typography, TypographyDefinition>;
  spacing: (num: number) => `${number}px`;
  logo: string;
};

const baseTheme: Omit<Theme, 'colors'> = {
  typography,
  fontFaces: [NunitoSansLight, NunitoSansRegular, NunitoSansSemiBold, NunitoSansBold],
  shadows,
  spacing: (num) => `${num * 4}px`,
  logo: 'url(assets/images/svg/logo.svg)',
};

export const lightTheme: Theme = {
  ...baseTheme,
  colors: defaultColors,
};

export const darkTheme: Theme = {
  ...baseTheme,
  colors: defaultColors,
};

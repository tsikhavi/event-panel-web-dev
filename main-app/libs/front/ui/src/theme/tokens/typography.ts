export type Typography =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body/xl'
  | 'body/l'
  | 'body/m'
  | 'body/s'
  | 'body/xs'
  | 'body/xxs'
  | 'button/m';

export type TypographyDefinition = {
  fontFamily: 'NunitoSans, Arial, sans-serif';
  fontStyle: 'normal';
  fontWeight: number;
  fontSize: `${number}px`;
  lineHeight: 'normal' | `${number}px`;
};

export const typography: Record<Typography, TypographyDefinition> = {
  h1: {
    fontFamily: 'NunitoSans, Arial, sans-serif',
    lineHeight: `normal`,
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: `48px`,
  },
  h2: {
    fontFamily: 'NunitoSans, Arial, sans-serif',
    lineHeight: `normal`,
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: `32px`,
  },
  h3: {
    fontFamily: 'NunitoSans, Arial, sans-serif',
    lineHeight: `normal`,
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: `28px`,
  },
  'body/xl': {
    fontFamily: 'NunitoSans, Arial, sans-serif',
    lineHeight: `normal`,
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: `22px`,
  },
  'body/l': {
    fontFamily: 'NunitoSans, Arial, sans-serif',
    lineHeight: `normal`,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: `20px`,
  },
  'body/m': {
    fontFamily: 'NunitoSans, Arial, sans-serif',
    lineHeight: `normal`,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: `18px`,
  },
  'body/s': {
    fontFamily: 'NunitoSans, Arial, sans-serif',
    fontStyle: 'normal',
    lineHeight: '20px',
    fontWeight: 400,
    fontSize: `16px`,
  },
  'body/xs': {
    fontFamily: 'NunitoSans, Arial, sans-serif',
    fontStyle: 'normal',
    lineHeight: `16px`,
    fontWeight: 400,
    fontSize: `14px`,
  },
  'body/xxs': {
    fontFamily: 'NunitoSans, Arial, sans-serif',
    fontStyle: 'normal',
    lineHeight: '16px',
    fontWeight: 400,
    fontSize: `12px`,
  },
  'button/m': {
    fontFamily: 'NunitoSans, Arial, sans-serif',
    lineHeight: `24px`,
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: `16px`,
  },
};

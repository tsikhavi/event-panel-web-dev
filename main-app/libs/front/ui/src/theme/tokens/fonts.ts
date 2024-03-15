export type FontFace = {
  fontFamily: string;
  fontWeight: number;
  src: `url(${string})`;
};

export const NunitoSansLight: FontFace = {
  fontFamily: 'NunitoSans',
  fontWeight: 300,
  src: 'url(assets/fonts/NunitoSans/NunitoSans-Light.ttf)',
};

export const NunitoSansRegular: FontFace = {
  fontFamily: 'NunitoSans',
  fontWeight: 400,
  src: 'url(assets/fonts/NunitoSans/NunitoSans-Regular.ttf)',
};

export const NunitoSansSemiBold: FontFace = {
  fontFamily: 'NunitoSans',
  fontWeight: 600,
  src: 'url(assets/fonts/NunitoSans/NunitoSans-SemiBold.ttf)',
};

export const NunitoSansBold: FontFace = {
  fontFamily: 'NunitoSans',
  fontWeight: 700,
  src: 'url(assets/fonts/NunitoSans/NunitoSans-Bold.ttf)',
};

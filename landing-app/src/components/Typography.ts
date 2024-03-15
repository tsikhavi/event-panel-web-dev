import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';
import { device } from '@/styles/breakpoints';

export const Headering = css`
  display: inline;
  font-family: ${(props) => props.theme.fonts.manrope};
  font-weight: 700;
  font-size: 88px;
  font-style: normal;
  line-height: normal;
  background: ${(props) => props.theme.colors.text.headering};
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacings.headering};
  @media ${device['sm']} {
    margin-bottom: 20px;
  }
`;

export const Headering1 = css`
  ${Headering};
  font-size: 88px;
  margin-bottom: 0;
  position: relative;
  z-index: 1000;
  @media ${device['sm']} {
    font-size: 34px;
    margin-bottom: 0;
  }
`;

export const Headering2 = css`
  ${Headering};
  font-size: 48px;
  @media ${device['sm']} {
    font-size: 32px;
  }
`;

export const Headering3 = css`
  ${Headering};
  font-size: 32px;
`;

export const BodyXL = css`
  font-family: ${theme.fonts.manrope};
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  @media ${device['sm']} {
    font-size: 22px;
  }
`;

export const BodyL = css`
  font-family: ${theme.fonts.manrope};
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const BodyM = css`
  font-family: ${theme.fonts.manrope};
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const BodyS = css`
  font-family: ${theme.fonts.manrope};
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const BodyXS = css`
  font-family: ${theme.fonts.manrope};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const BodyXXS = css`
  font-family: ${theme.fonts.manrope};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const LogoStyle = css`
  font-family: ${(props) => props.theme.fonts.nunitoSans};
  font-size: 22px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.white};
  text-transform: uppercase;
`;

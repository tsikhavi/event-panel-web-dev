import { css } from 'styled-components';

export const CardStyle = css`
  width: 100%;
  background-color: ${(props) => props.theme.colors.bg.card};
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.colors.stroke.grey};
`;

export const GlowStyle = css`
  width: 30vw;
  height: 60vh;
  position: absolute;
  border-radius: 100%;
  background: radial-gradient(
    ellipse,
    rgba(80, 146, 230, 0.2) 0%,
    rgba(0, 11, 55, 1) 100%
  );
  filter: blur(25px);
  z-index: -1;
`;

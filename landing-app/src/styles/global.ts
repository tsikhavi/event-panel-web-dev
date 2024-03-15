import { createGlobalStyle } from 'styled-components';
import { theme } from '@/styles/theme';
import { device } from '@/styles/breakpoints';

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
  }

  html, body {
    overflow-x: hidden;
    width: 100%;
  }

  body {
    font-family: ${theme.fonts.manrope};
    color: ${theme.colors.text.white};
    line-height: normal;
    background-color: ${theme.colors.bg.dark1};
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    min-height: 100vh;
    text-rendering: optimizeSpeed;
  }

  section {
    padding: 80px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media ${device['sm']} {
      padding: 40px 0 0;
    }
  }

  a {
    text-decoration: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
    opacity: 1;
    -moz-appearance: none;
    appearance: none;
    &:hover {
      text-decoration: none;
      outline: none;
    }
  }

  button {
    outline: none;
    -webkit-tap-highlight-color: transparent;
    opacity: 1;

    &:hover {
      text-decoration: none;
      outline: none;
    }

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  figure,
  blockquote,
  dl,
  dd {
    padding: 0;
    margin: 0;
  }

  button {
    border: none;
    background-color: transparent;
    font-family: inherit;
    padding: 0;
    cursor: pointer;
  }

  ul[role="list"],
  ol[role="list"] {
    list-style: none;
  }

  li {
    list-style-type: none;
  }

  html:focus-within {
    scroll-behavior: smooth;
  }

  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  img,
  picture {
    max-width: 100%;
    height: auto;
    display: block;

  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

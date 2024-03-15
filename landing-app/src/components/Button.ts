import styled, { css } from 'styled-components';
import Link from 'next/link';

const Button = styled(Link)`
  display: inline-block;
  color: ${(props) => props.theme.colors.text.white};
  border-radius: 50px;
  padding: 8px 16px;
  text-decoration: none;
  border: none;
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
  &:focus {
    outline: none;
    box-shadow: none;
  }
  user-select: none;
`;

export const Contained = styled(Button)`
  background-color: #22dbdc;
  background: ${(props) => props.theme.colors.button.default};
  &:hover {
    background-color: #22dbdc;
    background: ${(props) => props.theme.colors.button.hover};
    text-decoration: none;
    border: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  &:active {
    background-color: #22dbdc;
    background: ${(props) => props.theme.colors.button.pressed};
    text-decoration: none;
    border: none;
    outline: 1px solid #1e93c3;
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
    opacity: 1;
    -moz-appearance: none;
    appearance: none;
  }
`;

export const Outline = styled(Button)`
  border: 1px solid ${(props) => props.theme.colors.stroke.default};
  &:hover {
    border: 1px solid ${(props) => props.theme.colors.stroke.hover};
  }
  &:active {
    border: 1px solid ${(props) => props.theme.colors.stroke.pressed};
  }
`;

export const Ghost = styled(Button)`
  &:active {
    color: ${(props) => props.theme.colors.text.blue};
  }
`;

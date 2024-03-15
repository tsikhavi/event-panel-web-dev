import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { device } from '@/styles/breakpoints';

const StyledGlow = styled.div<{ $isRight?: boolean }>`
  position: absolute;
  transform: ${(props) => (props.$isRight ? 'scale(-1,1)' : 'initial')};
  overflow: hidden;
  @media ${device['sm']} {
    img {
      transform: translateX(-25%);
    }
  }
`;

interface GlowProps {
  isRight?: boolean;
}

const Glow: React.FC<GlowProps> = ({ isRight, ...props }) => {
  return (
    <StyledGlow {...props} $isRight={isRight}>
      <Image
        src={'/assets/img/glow.png'}
        alt={'Glow'}
        width={723}
        height={1683}
        draggable={false}
      />
    </StyledGlow>
  );
};

export default Glow;

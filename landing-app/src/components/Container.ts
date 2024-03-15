import { device } from '@/styles/breakpoints';
import styled from 'styled-components';

export const Container = styled.div`
  width: 1164px;
  margin: 0 auto;

  @media ${device['lg']} {
    width: 984px;
  }

  @media ${device['md']} {
    width: 725px;
  }
  @media ${device['sm']} {
    width: 100%;
    padding: 0 24px;
  }
`;

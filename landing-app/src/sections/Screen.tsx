import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Container } from '@/components/Container';
import { device } from '@/styles/breakpoints';

const StyledScreenSection = styled.section`
  position: relative;
`;

const StyledContainer = styled(Container)`
  @media ${device['sm']} {
    padding-right: 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
  padding-bottom: 45px;
  @media ${device['sm']} {
    padding-bottom: 0;
  }
`;

const Workspace = styled.div`
  max-width: 919px;
  border-radius: 40px;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.bg.white};
  box-shadow: 0px 4px 12px 0px rgba(0, 50, 115, 0.08);
  border: 1px solid #d9f2ff;

  @media ${device['md']} {
    max-width: 680px;
  }

  @media ${device['sm']} {
    max-width: initial;
    position: relative;
    border-radius: 20px 0 0 20px;
    overflow: hidden;
    min-height: 370px;
    height: auto;
    object-fit: cover;
    img {
      position: absolute;
      left: 0;
      right: 0;
      min-width: 100%;
      min-height: 100%;
      object-fit: cover;
      object-position: top left;
    }
  }
`;

const Card = styled.div`
  width: 452px;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 25px 0 15px;
  border-radius: 20px;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.bg.white};
  box-shadow: 0px 4px 12px 0px rgba(0, 50, 115, 0.08);
  border: 1px solid #d9f2ff;

  @media ${device['md']} {
    width: 274px;
  }

  @media ${device['sm']} {
    display: none;
  }
`;

const Screen = () => {
  return (
    <StyledScreenSection>
      <StyledContainer>
        <Wrapper>
          <Workspace>
            <Image
              src={'/assets/img/workspace.png'}
              alt={'Workspace'}
              width={1838}
              height={1148}
              draggable={false}
              priority={true}
              loading={'eager'}
            />
          </Workspace>
          <Card>
            <Image
              src={'/assets/img/card.png'}
              alt={'Card'}
              width={856}
              height={596}
              draggable={false}
            />
          </Card>
        </Wrapper>
      </StyledContainer>
    </StyledScreenSection>
  );
};

export default Screen;

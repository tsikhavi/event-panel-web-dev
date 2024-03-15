import React from 'react';
import styled from 'styled-components';
import * as Typography from '@/components/Typography';
import * as Button from '@/components/Button';
import { Container } from '@/components/Container';
import { device } from '@/styles/breakpoints';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const StyledMainSection = styled.section`
  position: relative;
`;

const Heading = styled.h1`
  ${Typography.Headering1};
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  text-align: center;
  width: 752px;
  z-index: 1000;
  @media ${device['sm']} {
    width: auto;
  }
`;

const Text = styled.p`
  ${Typography.BodyXL}
  padding: 32px 0 40px;
`;

const StyledBG = styled.div`
  position: absolute;
  background-color: ${(props) => props.theme.colors.bg.dark1};
  top: -72px;
  width: 100vw;
  height: 1000px;

  background-color: ${(props) => props.theme.colors.bg.dark1};
  overflow: hidden;
  z-index: -1;
  img {
    width: 100%;
    height: 100%;
  }

  @media ${device['sm']} {
    top: -72px;
    height: 1000px;
  }
`;

const Main = () => {
  const { t } = useTranslation();
  return (
    <StyledMainSection>
      <StyledBG>
        <Image
          src={'/assets/img/img.png'}
          alt={'Background'}
          width={2880}
          height={2074}
          draggable={false}
          priority
          loading={'eager'}
        />
      </StyledBG>
      <Heading>{t('main.sectionHeader')}</Heading>
      <Container>
        <Container>
          <Wrapper>
            <Text>{t('main.text')}</Text>
            <Button.Contained href={`${process.env.NEXT_PUBLIC_APP_HOST}`}>
              {t('main.button')}
            </Button.Contained>
          </Wrapper>
        </Container>
      </Container>
    </StyledMainSection>
  );
};

export default Main;

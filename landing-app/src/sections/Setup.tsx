import React from 'react';
import styled from 'styled-components';
import { Container } from '@/components/Container';
import * as Button from '@/components/Button';
import * as Typography from '@/components/Typography';
import { device } from '@/styles/breakpoints';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const StyledSetup = styled.section``;

const Wrapper = styled.div`
  position: relative;
  padding: 0 210px;
  @media ${device['md']} {
    padding: 0;
  }
`;

const Card = styled.article`
  position: relative;
  border-radius: 40px;
  background-color: ${(props) => props.theme.colors.bg.dark1};
  padding: 40px 80px;
  text-align: center;
  @media ${device['sm']} {
    border-radius: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
`;

const GlowBG = styled.div`
  width: 100vw;
  height: 800px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  @media ${device['sm']} {
    width: 100vw;
    height: 200%;
  }
`;

const Header = styled.header`
  margin-bottom: 32px;
  @media ${device['sm']} {
    margin-bottom: 12px;
  }
`;

const Title = styled.h3`
  font-family: ${(props) => props.theme.fonts.manrope};
  font-size: 34px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  @media ${device['sm']} {
    ${Typography.BodyL}
    padding: 0 15px
  }
`;

const Highlight = styled.strong`
  color: ${(props) => props.theme.colors.text.blue};
  white-space: nowrap;
`;

const Content = styled.main`
  margin-bottom: 40px;
  @media ${device['sm']} {
    margin-bottom: 20px;
  }
`;

const Text = styled.p`
  ${Typography.BodyS};
  @media ${device['sm']} {
    ${Typography.BodyXS}
  }
`;

const Footer = styled.footer``;

const Setup = () => {
  const { t } = useTranslation();
  return (
    <StyledSetup>
      <Container>
        <Wrapper>
          <Card>
            <Header>
              <Title>
                {t('setup.title')}
                <Highlight> {t('setup.titleHighlighted')}</Highlight>
              </Title>
            </Header>
            <Content>
              <Text>{t('setup.text')}.</Text>
            </Content>
            <Footer>
              <Button.Contained href={`${process.env.NEXT_PUBLIC_APP_HOST}`}>
                {t('setup.button')}
              </Button.Contained>
            </Footer>
            <GlowBG>
              <Image
                src={'/assets/img/big-glow.png'}
                alt={'Glow'}
                width={1440}
                height={996}
              />
            </GlowBG>
          </Card>
        </Wrapper>
      </Container>
    </StyledSetup>
  );
};

export default Setup;

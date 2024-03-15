import React from 'react';
import styled from 'styled-components';
import * as Typography from '@/components/Typography';
import { Container } from '@/components/Container';
import { CardStyle, GlowStyle } from '@/components/styled';
import { device } from '@/styles/breakpoints';
import { useTranslation } from 'next-i18next';

const StyledAdvantages = styled.section``;

const Heading = styled.h2`
  ${Typography.Headering2}
`;

const Wrapper = styled.div`
  display: flex;
  gap: 24px;
  padding-bottom: 72px;

  article:nth-child(2) {
    position: relative;
    top: 72px;
  }

  @media ${device['md']} {
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: 0;
    article:nth-child(2) {
      position: initial;
      top: initial;
      order: 99;
    }
  }

  @media ${device['sm']} {
    flex-wrap: nowrap;
    padding-bottom: 0;
    flex-direction: column;
    gap: 16px;
    article:nth-child(2) {
      position: initial;
      top: initial;
      order: initial;
    }
  }
`;

const Card = styled.article`
  ${CardStyle};
  position: relative;
  padding: 16px 32px;
  z-index: 10;

  @media ${device['md']} {
    width: 45%;
  }

  @media ${device['sm']} {
    padding: 16px 20px;
    width: 100%;
  }
`;

const Header = styled.header`
  margin-bottom: 16px;
`;

const Title = styled.h3`
  ${Typography.BodyS};
  color: ${(props) => props.theme.colors.bg.white};
`;

const Main = styled.main``;

const Content = styled.p`
  ${Typography.BodyXXS};
  color: ${(props) => props.theme.colors.text.grey};
`;

const Advantages = () => {
  const { t } = useTranslation();
  return (
    <StyledAdvantages>
      <Heading>{t('advantages.sectionHeader')}</Heading>
      <Container>
        <Wrapper>
          <Card>
            <Header>
              <Title>{t('advantages.block1.title')}</Title>
            </Header>
            <Main>
              <Content>{t('advantages.block1.text')}</Content>
            </Main>
          </Card>
          <Card>
            <Header>
              <Title>{t('advantages.block2.title')}</Title>
            </Header>
            <Main>
              <Content>{t('advantages.block2.text')} </Content>
            </Main>
          </Card>
          <Card>
            <Header>
              <Title>{t('advantages.block3.title')}</Title>
            </Header>
            <Main>
              <Content>{t('advantages.block3.text')}</Content>
            </Main>
          </Card>
        </Wrapper>
      </Container>
    </StyledAdvantages>
  );
};

export default Advantages;

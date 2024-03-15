import React from 'react';
import styled from 'styled-components';
import * as Typography from '@/components/Typography';
import * as Button from '@/components/Button';
import { Container } from '@/components/Container';
import { CardStyle } from '@/components/styled';
import Image from 'next/image';

import { device } from '@/styles/breakpoints';
import Glow from '@/components/Glow';
import { useTranslation } from 'next-i18next';

const StyledPricing = styled.section`
  position: relative;
`;

const Heading = styled.h2`
  ${Typography.Headering2}
`;

const Glow1 = styled(Glow)`
  top: -100%;
  left: 0;
  @media ${device['lg']} {
    top: -50%;
  }
  @media ${device['md']} {
    top: -50%;
  }
  @media ${device['sm']} {
    top: -25%;
  }
`;

const Glow2 = styled(Glow)`
  right: 0;
  top: -25%;
  @media ${device['lg']} {
    top: initial;
    bottom: -25%;
  }
  @media ${device['md']} {
    top: initial;
    bottom: -50%;
  }
  @media ${device['sm']} {
    top: initial;
    bottom: -10%;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 40px;
  @media ${device['sm']} {
    flex-direction: column;
    gap: 16px;
  }
  @media ${device['lg']} {
    gap: 24px;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
  }
`;

const Card = styled.article`
  ${CardStyle};
  position: relative;
  z-index: 9999;
  padding: 32px;
  display: flex;
  flex-direction: column;

  @media ${device['lg']} {
    width: 40%;
  }

  @media ${device['md']} {
    width: 48%;
  }

  @media ${device['sm']} {
    width: 100%;
    padding: 20px;
  }
`;

const Header = styled.header`
  border-bottom: 1px solid ${(props) => props.theme.colors.stroke.grey};
  padding-bottom: 4px;
`;

const Title = styled.h3`
  ${Typography.BodyL};
  text-align: center;
  color: ${(props) => props.theme.colors.text.grey};
  @media ${device['sm']} {
    ${Typography.BodyM};
  }
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Price = styled.div`
  font-family: ${(props) => props.theme.fonts.manrope};
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${(props) => props.theme.colors.text.white};
  text-align: center;
  padding: 24px;
  @media ${device['sm']} {
    font-size: 34px;
    padding: 12px;
  }
`;

const Text = styled.p`
  ${Typography.BodyXS};
  height: 88px;
  color: ${(props) => props.theme.colors.text.grey};
  margin-bottom: 24px;
  @media ${device['sm']} {
    height: auto;
    margin-bottom: 12px;
    flex-grow: 1;
  }
`;

const Coins = styled.div`
  margin-bottom: 40px;
  flex-grow: 1;
  @media ${device['sm']} {
    margin-bottom: 20px;
    flex-grow: 0;
  }
`;

const Coin = styled.div`
  ${Typography.BodyXS};
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
  @media ${device['sm']} {
    gap: 6px;
  }
`;

const Footer = styled.footer`
  text-align: center;
`;

const Pricing = () => {
  const { t } = useTranslation();
  const cards = [
    t('pricing.card1', { returnObjects: true }),
    t('pricing.card2', { returnObjects: true }),
    t('pricing.card3', { returnObjects: true }),
  ];
  return (
    <StyledPricing>
      <Glow1 />
      <Glow2 isRight={true} />
      <Heading>{t('pricing.sectionHeader')}</Heading>
      <Container>
        <Wrapper>
          {cards.map((card: any, index) => (
            <Card key={index}>
              <Header>
                <Title>{card.title}</Title>
              </Header>
              <Content>
                <Price>{card.price}</Price>
                <Text>{card.text}</Text>
                <Coins>
                  {card.coins.map((coin: any, index: number) => (
                    <Coin key={index}>
                      <Image
                        src={'/assets/svg/add-circle.svg'}
                        alt={'Coin'}
                        width={24}
                        height={24}
                        draggable={false}
                      />
                      {coin}
                    </Coin>
                  ))}
                </Coins>
              </Content>
              <Footer>
                <Button.Contained href={`${process.env.NEXT_PUBLIC_APP_HOST}`}>
                  {card.button}
                </Button.Contained>
              </Footer>
            </Card>
          ))}
        </Wrapper>
      </Container>
    </StyledPricing>
  );
};

export default Pricing;

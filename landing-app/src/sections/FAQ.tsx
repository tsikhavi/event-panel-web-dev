'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import * as Typography from '@/components/Typography';
import { Container } from '@/components/Container';
import Image from 'next/image';
import { CardStyle } from '@/components/styled';
import { device } from '@/styles/breakpoints';
import { animated, useSpring } from 'react-spring';
import useMeasure from 'react-use-measure';
import { useTranslation } from 'next-i18next';

const StyledFAQ = styled.section``;
const Heading = styled.h2`
  ${Typography.Headering2}
`;
const Wrapper = styled.div`
  padding: 0 115px;
  .szh-accordion__item {
    ${Typography.BodyM}

    &-btn {
      ${CardStyle};
      color: ${(props) => props.theme.colors.text.white};
      display: flex;
      position: relative;
      padding: 16px 32px;
      box-shadow: 0px 4px 4px 0px rgba(3, 4, 44, 0.04);
      cursor: pointer;
      @media ${device['sm']} {
        border: none;
        border-radius: 12px;
        padding: 12px 20px;
      }
    }
  }
  .szh-accordion__item-content {
    transition: height 0.25s cubic-bezier(0, 0, 0, 1) !important;
  }
  @media ${device['md']} {
    padding: 0;
  }
`;

const FAQItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FAQItem = styled.article`
  ${CardStyle};

  display: inline-block;
  text-align: left;
  position: relative;
  padding: 16px 32px;
  box-shadow: 0px 4px 4px 0px rgba(3, 4, 44, 0.04);
  cursor: pointer;

  outline: none;
  -webkit-tap-highlight-color: transparent;
  &:hover {
    text-decoration: none;
    outline: none;
  }

  @media ${device['sm']} {
    border: none;
    border-radius: 12px;
    padding: 12px 20px;
  }
`;

const Header = styled.header``;
const Title = styled.h3`
  ${Typography.BodyM}
`;
const Content = styled.main``;
const Text = styled.p<{ $isActive?: boolean }>`
  ${Typography.BodyS};
  color: ${(props) => props.theme.colors.text.grey};

  padding-top: 12px;

  @media ${device['sm']} {
    ${Typography.BodyXS};
  }
  overflow: hidden;
`;
const Button = styled.button`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 10px;
  right: 25px;
  @media ${device['sm']} {
    top: 10px;
    right: 20px;
    width: 32px;
    height: 32px;
  }
`;

interface ItemProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const Item: React.FC<ItemProps> = ({ children, isOpen }) => {
  const [ref, { height }] = useMeasure();
  const { size } = useSpring({
    size: isOpen ? height : 0,
  });
  return (
    <animated.div style={{ height: size, overflow: 'hidden' }}>
      <Text ref={ref}>{children}</Text>
    </animated.div>
  );
};

const FAQ = () => {
  const [active, setActive] = useState<number | null>(null);
  const handleClick = (index: number) =>
    index === active ? setActive(null) : setActive(index);
  const { t } = useTranslation();
  const faq: Array<any> = t('faq.items', { returnObjects: true });
  return (
    <StyledFAQ>
      <Heading>{t('faq.sectionHeader')}</Heading>
      <Container>
        <Wrapper>
          <FAQItems>
            {faq.map((item, index) => (
              <FAQItem key={index} onClick={() => handleClick(index)}>
                <Header>
                  <Title>{item.title}</Title>
                </Header>
                <Content>
                  <Item isOpen={active === index}>{item.text}</Item>
                  <Button>
                    {active === index ? (
                      <Image
                        src={'/assets/svg/close.svg'}
                        alt={'Close'}
                        width={40}
                        height={40}
                      />
                    ) : (
                      <Image
                        src={'/assets/svg/open.svg'}
                        alt={'Open'}
                        width={40}
                        height={40}
                      />
                    )}
                  </Button>
                </Content>
              </FAQItem>
            ))}
          </FAQItems>
        </Wrapper>
      </Container>
    </StyledFAQ>
  );
};

export default FAQ;

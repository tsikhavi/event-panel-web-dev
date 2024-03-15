import React from 'react';
import styled from 'styled-components';
import * as Typography from '@/components/Typography';
import { Container } from '@/components/Container';
import Image from 'next/image';
import { device } from '@/styles/breakpoints';
import Glow from '@/components/Glow';
import { useTranslation } from 'next-i18next';

const StyledBlocks = styled.section`
  position: relative;
`;

const Heading = styled.h2`
  ${Typography.Headering2}
`;

const Glow1 = styled(Glow)`
  top: -25%;
  left: 0;

  @media ${device['md']} {
    top: -50%;
  }

  @media ${device['sm']} {
  }
`;

const Glow2 = styled(Glow)`
  bottom: -50%;
  right: 0;
  @media ${device['sm']} {
    bottom: -75%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media ${device['sm']} {
    padding: 0;
    gap: 20;
  }
`;

const Block = styled.article`
  display: flex;
  gap: 40px;
  align-items: center;
  @media ${device['sm']} {
    gap: 20px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 320px;
  height: auto;
  border-radius: 20px;
  overflow: hidden;
  flex-shrink: 0;
  @media ${device['sm']} {
    min-width: 120px;
    max-width: 320px;
    width: auto;
    border-radius: 12px;
    flex-shrink: 1;
    height: 100%;
  }
  z-index: 9999;
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  position: relative;
  z-index: 9999;
  @media ${device['sm']} {
    gap: 8px;
  }
`;

const Title = styled.h3`
  ${Typography.Headering}
  ${Typography.BodyXL};
  margin-bottom: 0;
  @media ${device['sm']} {
    ${Typography.BodyM}
    margin-bottom: 0;
  }
`;

const Text = styled.p`
  ${Typography.BodyL};
  width: 660px;
  color: ${(props) => props.theme.colors.text.white};
  text-align: center;

  @media ${device['md']} {
    ${Typography.BodyXS}
    width: auto;
  }

  @media ${device['sm']} {
    ${Typography.BodyXS}
    width: auto;
  }
`;

const Blocks = () => {
  const { t } = useTranslation();
  return (
    <StyledBlocks>
      <Glow1 />
      <Glow2 isRight={true} />
      <Heading>{t('blocks.sectionHeader')}</Heading>
      <Container>
        <Wrapper>
          <Block>
            <ImageWrapper>
              <Image
                src={'/assets/img/image1.png'}
                alt={'Block image'}
                width={320}
                height={320}
                draggable={false}
              />
            </ImageWrapper>
            <Content>
              <Title>{t('blocks.block1.title')}</Title>
              <Text>{t('blocks.block1.text')}</Text>
            </Content>
          </Block>
          <Block style={{ flexDirection: 'row-reverse' }}>
            <ImageWrapper>
              <Image
                src={'/assets/img/image2.png'}
                alt={'Block image'}
                width={320}
                height={320}
                draggable={false}
              />
            </ImageWrapper>
            <Content>
              <Title>{t('blocks.block2.title')}</Title>
              <Text>{t('blocks.block2.text')}</Text>
            </Content>
          </Block>
          <Block>
            <ImageWrapper>
              <Image
                src={'/assets/img/image3.png'}
                alt={'Block image'}
                width={320}
                height={320}
                draggable={false}
              />
            </ImageWrapper>
            <Content>
              <Title>{t('blocks.block3.title')}</Title>
              <Text>{t('blocks.block3.text')}</Text>
            </Content>
          </Block>
        </Wrapper>
      </Container>
    </StyledBlocks>
  );
};

export default Blocks;

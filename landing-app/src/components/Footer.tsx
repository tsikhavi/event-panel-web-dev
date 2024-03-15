import React from 'react';
import styled from 'styled-components';
import { Container } from '@/components/Container';
import Logo from '@/components/Logo';
import Image from 'next/image';
import Link from 'next/link';
import { device } from '@/styles/breakpoints';
import { useTranslation } from 'next-i18next';

const StyledFooter = styled.footer``;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 120px 0 60px;
  border-bottom: 1px solid ${(props) => props.theme.colors.stroke.grey};
  @media ${device['sm']} {
    flex-direction: column;
    gap: 20px;
    padding: 40px 0 20px;
  }
`;

const Copyright = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 157.143% */
  padding: 20px 0 40px;
  text-align: center;
  @media ${device['sm']} {
    padding: 10px 0 20px;
  }
`;

const Icon = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.icon.inactive};
  border-radius: 100%;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: ${(props) => props.theme.colors.icon.active};
  }
`;

const Social = styled.div`
  display: flex;
  gap: 12px;
`;

const Footer = () => {
  const { t } = useTranslation();
  return (
    <StyledFooter>
      <Container>
        <Content>
          <Logo />
          <Social>
            <Link href={t('footer.twitter')} target={'_blank'}>
              <Icon>
                <Image
                  src={'/assets/svg/twitter.svg'}
                  alt={'Twitter'}
                  width={12}
                  height={10}
                />
              </Icon>
            </Link>
            <Link href={t('footer.facebook')} target={'_blank'}>
              <Icon>
                <Image
                  src={'/assets/svg/facebook.svg'}
                  alt={'Facebook'}
                  width={8}
                  height={13}
                />
              </Icon>
            </Link>
            <Link href={t('footer.instagram')} target={'_blank'}>
              <Icon>
                <Image
                  src={'/assets/svg/instagram.svg'}
                  alt={'Instagram'}
                  width={14}
                  height={14}
                />
              </Icon>
            </Link>
            <Link href={t('footer.github')} target={'_blank'}>
              <Icon>
                <Image
                  src={'/assets/svg/github.svg'}
                  alt={'Github'}
                  width={14}
                  height={13}
                />
              </Icon>
            </Link>
          </Social>
        </Content>
        <Copyright>{t('footer.copyright')}</Copyright>
      </Container>
    </StyledFooter>
  );
};

export default Footer;

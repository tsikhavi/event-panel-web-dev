import React from 'react';
import styled from 'styled-components';
import Logo from '@/components/Logo';
import * as Button from '@/components/Button';
import { Container } from '@/components/Container';
import { device } from '@/styles/breakpoints';
import { useTranslation } from 'next-i18next';
import SwitchLanguage from '@/components/SwitchLanguage';
import { useRouter } from 'next/router';
import i18nextConfig from '../../next-i18next.config';

const StyledHeader = styled.header`
  width: 100%;
  height: 72px;
  padding: 12px 0;
  z-index: 9999;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  @media ${device['sm']} {
    gap: 0;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const TryButton = styled(Button.Outline)`
  @media ${device['sm']} {
    display: none;
  }
`;

export const Header = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const currentLocale = router.query.locale || i18nextConfig.i18n.defaultLocale;
  return (
    <StyledHeader>
      <Container>
        <Wrapper>
          <Logo />
          <Buttons>
            {i18nextConfig.i18n.locales.map((locale) => {
              if (locale === currentLocale) return null;
              return <SwitchLanguage locale={locale} key={locale} />;
            })}
            <Button.Ghost href={`${process.env.NEXT_PUBLIC_APP_HOST}`}>
              {t('header.loginBtn')}
            </Button.Ghost>
            <TryButton href={`${process.env.NEXT_PUBLIC_APP_HOST}`}>
              {t('header.outlineBtn')}
            </TryButton>
          </Buttons>
        </Wrapper>
      </Container>
    </StyledHeader>
  );
};

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import * as Typography from '@/components/Typography';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.h2`
  ${Typography.LogoStyle};
`;

const Logo = () => {
  const { t } = useTranslation();
  return (
    <Link href={'/'}>
      <StyledLogo>
        <Image
          src={'/assets/img/logo.png'}
          alt={t('logo')}
          width={48}
          height={48}
          draggable={false}
          priority={true}
          loading={'eager'}
        />
        <Text>{t('logo')}</Text>
      </StyledLogo>
    </Link>
  );
};

export default Logo;

import React from 'react';

import { Title, TitleProps } from '@mantine/core';

interface HeadlineProps extends Omit<TitleProps, 'size' | 'order'> {
  variant: '1' | '2' | '3' | '4' | '5' | '6';
}

export const headlineVariantsStyles = {
  1: {
    fontWeight: 700,
    fontSize: 64,
    lineHeight: '72px',
  },
  2: {
    fontWeight: 700,
    fontSize: 48,
    lineHeight: '56px',
  },
  3: {
    fontWeight: 700,
    fontSize: 40,
    lineHeight: '48px',
  },
  4: {
    fontWeight: 700,
    fontSize: 28,
    lineHeight: '40px',
  },
  5: {
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '40px',
  },
  6: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '32px',
  },
};

const Headline = ({ children, variant, ...titleProps }: HeadlineProps): JSX.Element => {
  return (
    <Title {...titleProps} sx={{ ...headlineVariantsStyles[variant], ...titleProps.sx }}>
      {children}
    </Title>
  );
};

export default Headline;

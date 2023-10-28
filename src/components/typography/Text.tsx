import React from 'react';

import { Text as MantineText, TextProps as MantineTextProps } from '@mantine/core';

interface TextProps extends Omit<MantineTextProps, 'size'> {
  variant: 'body1' | 'body2' | 'base1' | 'base2' | 'caption1' | 'caption2';
}

export const textVariantsStyles = {
  body1: {
    fontWeight: 400,
    fontSize: 24,
    lineHeight: '36px',
  },
  body2: {
    fontWeight: 400,
    fontSize: 17,
    lineHeight: '24px',
  },
  base1: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '24px',
  },
  base2: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '24px',
  },
  caption1: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: 12,
    lineHeight: '20px',
  },
  caption2: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: 11,
    lineHeight: '16px',
  },
};

const Text = ({ children, variant, ...textProps }: TextProps): JSX.Element => {
  return (
    <MantineText {...textProps} sx={{ ...textVariantsStyles[variant], ...textProps.sx }}>
      {children}
    </MantineText>
  );
};

export default Text;

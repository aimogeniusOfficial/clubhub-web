import { MantineTheme } from '@mantine/core';

const Button = {
  styles: {
    root: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 600,
    },
  },

  variants: {
    primaryFilled: (theme: MantineTheme) => ({
      root: {
        color: theme.white,

        backgroundColor: theme.colors.primary[5],
        '&:not([data-disabled])': theme.fn.hover({
          backgroundColor: theme.colors.primary[4],
        }),
        '&[data-disabled]': {
          backgroundColor: theme.fn.rgba(theme.colors.primary[5], 0.5),
          border: `2px solid ${theme.colors.primary[5]}`,
        },
        '&:active:not([data-disabled])': {
          backgroundColor: theme.colors.primary[6],
        },
      },
    }),
    secondary: (theme: MantineTheme) => ({
      root: {
        color: theme.white,

        backgroundColor: theme.colors.secondary[0],
        '&:not([data-disabled])': theme.fn.hover({
          backgroundColor: theme.colors.secondary[1],
        }),
        '&[data-disabled]': {
          backgroundColor: theme.fn.rgba(theme.colors.neutral[0], 0.5),
          border: `2px solid ${theme.colors.neutral[1]}`,
        },
        '&:active:not([data-disabled])': {
          backgroundColor: theme.colors.neutral[1],
        },
      },
    }),
    ghostFilled: (theme: MantineTheme) => ({
      root: {
        color: theme.white,
        boxShadow: `inset 0 0 0 2px ${theme.colors.neutral[4]}`,

        '&:not([data-disabled])': theme.fn.hover({
          backgroundColor: theme.colors.neutral[4],
        }),
        '&[data-disabled]': {
          backgroundColor: theme.fn.rgba(theme.colors.neutral[5], 0),
          color: theme.fn.rgba(theme.white, 0.25),
        },
        '&:active:not([data-disabled])': {
          backgroundColor: theme.colors.neutral[4],
          boxShadow: 'inset 0px 2px 2px #2D3031',
        },
      },
      label: {
        overflow: 'visible',
      },
    }),
  },

  defaultProps: {
    radius: 12,
    variant: 'primaryFilled',
  },
};

export default Button;

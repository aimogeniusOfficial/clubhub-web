import { MantineTheme } from '@mantine/core';

const Input = {
  variants: {
    filled: (theme: MantineTheme) => ({
      input: {
        fontWeight: 500,
        backgroundColor: theme.colors.neutral[6],
        border: '1px solid transparent',
        color: theme.colors.neutral[2],

        '&::placeholder': {
          color: theme.fn.rgba(theme.colors.neutral[3], 0.5),
        },
        '&[focus]': {
          borderColor: theme.colors.primary[0],
        },
        '&[data-invalid]': {
          color: theme.colors.accent[0],
          borderColor: theme.colors.accent[0],
        },
        '&:disabled': {
          backgroundColor: theme.colors.neutral[3],
        },
        error: {
          color: theme.colors.accent[0],
        },
        icon: {
          color: theme.colors.neutral[3],
        },
      },
    }),
  },
  defaultProps: {
    variant: 'filled',
    radius: 12,
  },
};

export default Input;

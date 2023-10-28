import { MantineTheme } from '@mantine/core';

const Modal = {
  styles: (theme: MantineTheme) => ({
    body: {
      background: theme.colorScheme === 'dark' ? theme.colors.neutral[4] : theme.colors.neutral[6],
      padding: theme.spacing.xl,
    },
    header: {
      background: theme.colorScheme === 'dark' ? theme.colors.neutral[4] : theme.colors.neutral[6],
      padding: theme.spacing.xl,
    },
    close: {
      borderRadius: '50%',
      padding: 8,
      width: 'fit-content',
      height: 'fit-content',
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors.neutral[4], 0.75)
          : theme.colors.neutral[3],
      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors.neutral[3], 0.5)
            : theme.colors.neutral[2],
      },
      '& svg': {
        color: theme.colorScheme === 'dark' ? theme.colors.neutral[3] : theme.colors.neutral[4],
      },
    },
  }),
  defaultProps: (theme: MantineTheme) => ({
    radius: 24,
    overlayProps: {
      color:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors.neutral[5], 0.9)
          : theme.colors.gray[2],
      opacity: 0.55,
      blur: 3,
    },
  }),
};

export default Modal;

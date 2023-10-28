import { MantineTheme } from '@mantine/core';

const Drawer = {
  defaultProps: (theme: MantineTheme) => ({
    position: 'right',
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

export default Drawer;

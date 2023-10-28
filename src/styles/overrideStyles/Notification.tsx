import { MantineTheme } from '@mantine/core';

const Notification = {
  styles: (theme: MantineTheme) => ({
    root: {
      border: `1px solid ${theme.colors.neutral[5]}`,
      background: theme.colors.neutral[6],
      padding: '8px 16px',
    },
    icon: {
      width: '20px',
      height: '20px',
      marginRight: '10px',
    },
  }),

  defaultProps: {
    radius: 8,
  },
};

export default Notification;

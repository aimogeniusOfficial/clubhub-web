import { MantineTheme } from '@mantine/core';

const SegmentedControl = {
  styles: (theme: MantineTheme) => ({
    root: {
      background: theme.colors.neutral[6],
      borderRadius: '12px',
    },
    label: {
      fontWeight: 600,
      lineHeight: '24px',
      letterSpacing: '-0.02em',
      color: theme.colors.neutral[3],
    },
    control: {
      ':not(:first-of-type)': {
        borderColor: 'transparent',
      },
    },
    indicator: {
      borderRadius: 8,
    },
    controlActive: {
      color: theme.colors.neutral[5],
      boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.07), inset 0px 1px 2px rgba(255, 255, 255, 0.02)',
      borderRadius: 10,
    },
  }),

  defaultProps: {},
};

export default SegmentedControl;

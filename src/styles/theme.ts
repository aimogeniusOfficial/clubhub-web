import { MantineThemeOverride, Tuple, DefaultMantineColor } from '@mantine/core';

import Button from './overrideStyles/Button';
import Drawer from './overrideStyles/Drawer';
import Input from './overrideStyles/Input';
import LoadingOverlay from './overrideStyles/LoadingOverlay';
import Menu from './overrideStyles/Menu';
import Modal from './overrideStyles/Modal';
import Notification from './overrideStyles/Notification';
import SegmentedControl from './overrideStyles/SegmentedControl';

type ExtendColors = 'primary' | 'neutral' | 'accent' | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendColors, Tuple<string, 10>>;
  }
}

const primary: Tuple<string, 10> = [
  '#f2fbf3',
  '#e0f8e4',
  '#93e2a3',
  '#c2f0ca',
  '#5ccc72',
  '#36b14e',
  '#27903c',
  '#227332',
  '#205b2c',
  '#1c4b27',
];

const neutral: Tuple<string, 7> = [
  '#fefefe',
  '#f3f5f7',
  '#e8ecef',
  '#6c7275',
  '#343839',
  '#232627',
  '#141718',
];

const secondary: Tuple<string, 2> = ['#25262b', '#2C2E33'];

const accent: Tuple<string, 5> = ['#d84c10', '#3e90f0', '#8e55ea', '#8c6584', '#dda73f'];

// https://github.com/mantinedev/mantine/blob/master/src/mantine-styles/src/theme/default-theme.ts

const commonStyles: MantineThemeOverride = {
  colorScheme: 'light',
  colors: {
    primary,
    secondary,
    neutral,
    accent,
  },
  primaryColor: 'primary',

  fontFamily: 'Karla, sans-serif',
  fontFamilyMonospace: 'Karla, sans-serif',
  headings: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
  },
  other: {
    fontWeights: {
      medium: 500,
      semibold: 600,
    },
  },

  cursorType: 'pointer',

  components: {
    Modal,
    Input,
    Button,
    SegmentedControl,
    Notification,
    Menu,
    Drawer,
    LoadingOverlay,
  },
};

export const lightTheme: MantineThemeOverride = {
  ...commonStyles,
};

export const darkTheme: MantineThemeOverride = {
  ...commonStyles,
  colorScheme: 'dark',
  focusRing: 'auto',
  colors: {
    primary,
    neutral,
    secondary,
    accent,
  },
  primaryColor: 'primary',
  components: {
    ...commonStyles.components,
    // DO NOT REMOVE this is example
    // Button: theme => ({
    //   variants: {
    //     primary: () => ({
    //       root: {
    //         backgroundColor: theme.colors.primary[9];
    //       }
    //     }),
    //   },
    // }),
  },
};

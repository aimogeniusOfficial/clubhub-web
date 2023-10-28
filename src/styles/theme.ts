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

// Default background index is 0
const background: Tuple<string, 1> = ['#e8ecef'];

const primary: Tuple<string, 10> = [
  '#f3f2f8',
  '#e5e0f7',
  '#c2a3e7',
  '#cac0f2',
  '#9a72d9',
  '#8e4ebf',
  '#763ca4',
  '#63328f',
  '#572c87',
  '#492774',
];

const neutral: Tuple<string, 7> = [
  '#141718',
  '#232627',
  '#343839',
  '#6c7275',
  '#e8ecef',
  '#f3f5f7',
  '#fefefe',
];

const secondary: Tuple<string, 2> = ['#25262b', '#2C2E33'];

const accent: Tuple<string, 5> = ['#d84c10', '#3e90f0', '#8e55ea', '#8c6584', '#dda73f'];

// https://github.com/mantinedev/mantine/blob/master/src/mantine-styles/src/theme/default-theme.ts

const commonStyles: MantineThemeOverride = {
  colorScheme: 'light',
  colors: {
    background,
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

  white: '#fefefe',

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

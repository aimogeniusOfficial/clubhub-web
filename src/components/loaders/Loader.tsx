import React from 'react';

import { createStyles, keyframes } from '@mantine/core';

const orbitAnimation = keyframes({
  'from, 0%, to': { transform: 'rotate(0deg)' },
  '80%': { transform: 'rotate(360deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const useStyles = createStyles(theme => ({
  loader: {
    width: 50,
    height: 10,
    position: 'relative',
    transform: 'rotate(90deg)',
  },
  orbit: {
    position: 'absolute',
    width: '100%',
    height: '100%',

    '&::after': {
      position: 'absolute',
      width: 10,
      height: 10,
      content: "''",
      top: 0,
      left: 0,
      background: theme.colors.primary[5],
      boxShadow: `0px 0px 20px 2px ${theme.colors.primary[5]}`,
      borderRadius: '50%',
    },
  },
  orbit0: {
    animation: `${orbitAnimation} ease-in-out 1.5s calc(0 * 0.1s) infinite`,
    opacity: 'calc(1 - calc(0.2 * 0))',
  },
  orbit1: {
    animation: `${orbitAnimation} ease-in-out 1.5s calc(1 * 0.1s) infinite`,
    opacity: 'calc(1 - calc(0.2 * 1))',
  },
  orbit2: {
    animation: `${orbitAnimation} ease-in-out 1.5s calc(2 * 0.1s) infinite`,
    opacity: 'calc(1 - calc(0.2 * 2))',
  },
  orbit3: {
    animation: `${orbitAnimation} ease-in-out 1.5s calc(3 * 0.1s) infinite`,
    opacity: 'calc(1 - calc(0.2 * 3))',
  },
  orbit4: {
    animation: `${orbitAnimation} ease-in-out 1.5s calc(4 * 0.1s) infinite`,
    opacity: 'calc(1 - calc(0.2 * 4))',
  },
}));

const Loader = (): JSX.Element => {
  const { classes, cx } = useStyles();

  return (
    <div className={classes.loader}>
      <div className={cx(classes.orbit, classes.orbit0)} />
      <div className={cx(classes.orbit, classes.orbit1)} />
      <div className={cx(classes.orbit, classes.orbit2)} />
      <div className={cx(classes.orbit, classes.orbit3)} />
      <div className={cx(classes.orbit, classes.orbit4)} />
    </div>
  );
};

export default Loader;

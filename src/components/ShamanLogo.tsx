import React from 'react';

import { createStyles, Group, keyframes, Title } from '@mantine/core';
import TengriStar from 'assets/logos/tengri-star.svg';

export const resizeAnimation = keyframes({
  'from, 0%, to': {
    width: 0,
    height: 0,
  },
  '50%': {
    width: 12,
    height: 12,
  },
  '100%': {
    width: 0,
    height: 0,
  },
});

const useStyles = createStyles(theme => ({
  logoStar: {
    position: 'relative',
    '::before': {
      boxShadow: `0 0 88px 12px ${theme.colors.primary[6]}`,
      content: '" "',
      borderRadius: '50%',
      height: 12,
      width: 12,
      position: 'absolute',
      animation: `${resizeAnimation} 5s linear infinite`,
      zIndex: 0,

      top: 14,
      left: 15,
    },
  },
}));

const ShamanLogo = (): JSX.Element => {
  const { classes } = useStyles();

  return (
    <Group spacing='sm' position='center' mb='lg'>
      {/* <div className={classes.logoStar}>
        <img src={TengriStar} alt='tengri-star' width={37} />
      </div> */}
      <Title color='white' size={28} weight={800} sx={{ letterSpacing: '-0.04em' }}>
        clubhub
      </Title>
    </Group>
  );
};

export default ShamanLogo;

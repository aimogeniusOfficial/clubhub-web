import React from 'react';

import { createStyles } from '@mantine/core';
import TengriStar from 'assets/logos/tengri-star.svg';

import { resizeAnimation } from '../../../../components/ShamanLogo';

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

const ShamanLogo = ({ size = 37 }: { size?: number }): JSX.Element => {
  const { classes } = useStyles();

  return (
    <div className={classes.logoStar}>
      <img src={TengriStar} alt='tengri-star' width={size} />
    </div>
  );
};

export default ShamanLogo;

import React from 'react';

import { createStyles } from '@mantine/core';
import Loader from 'components/loaders/Loader';

const useStyles = createStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
}));

const Loading = (): JSX.Element => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Loader />
    </div>
  );
};

export default Loading;

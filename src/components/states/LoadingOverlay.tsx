import React from 'react';

import { LoadingOverlay as MLoadingOverlay, LoadingOverlayProps } from '@mantine/core';

const LoadingOverlay = (props: LoadingOverlayProps): JSX.Element => {
  return <MLoadingOverlay {...props} overlayBlur={2} />;
};

export default LoadingOverlay;

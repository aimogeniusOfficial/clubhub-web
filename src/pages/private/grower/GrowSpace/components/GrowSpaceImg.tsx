import React from 'react';

import { Image, ImageProps } from '@mantine/core';
import GrowSpaceOther from 'assets/images/grow-space-other.png';
import IndoorGrowRoom from 'assets/images/indoor-grow-room.png';
import IndoorOther from 'assets/images/indoor-other.png';
import IndoorTent from 'assets/images/indoor-tent.png';

interface GrowSpaceImgProps extends Omit<ImageProps, 'src'> {
  environment?: string;
  spaceType?: string;
}

const GrowSpaceImg = ({ environment, spaceType, ...imgProps }: GrowSpaceImgProps): JSX.Element => {
  if (environment === 'INDOOR' && spaceType === 'TENT') {
    return <Image src={IndoorTent} height={160} fit='cover' alt='tent' {...imgProps} />;
  }
  if (environment === 'INDOOR' && spaceType === 'GROW_ROOM') {
    return <Image src={IndoorGrowRoom} height={160} fit='cover' alt='grow-room' {...imgProps} />;
  }
  if (environment === 'INDOOR' && spaceType === 'OTHER') {
    return <Image src={GrowSpaceOther} height={160} fit='cover' alt='other' {...imgProps} />;
  }

  return <Image src={IndoorOther} height={160} alt='grow-space' {...imgProps} />;
};

export default GrowSpaceImg;

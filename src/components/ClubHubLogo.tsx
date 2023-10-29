import React from 'react';

import { Group, keyframes, Title, useMantineTheme } from '@mantine/core';

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

const ShamanLogo = (): JSX.Element => {
  const theme = useMantineTheme();
  return (
    <Group spacing='sm' position='center' mb='lg'>
      <Title
        color={theme.colors.primary[7]}
        size={28}
        weight={800}
        sx={{ letterSpacing: '-0.04em' }}
      >
        clubhub
      </Title>
    </Group>
  );
};

export default ShamanLogo;

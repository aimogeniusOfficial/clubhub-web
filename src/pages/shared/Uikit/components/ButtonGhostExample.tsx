import React from 'react';

import { Button, Group, Paper } from '@mantine/core';
import Headline from 'components/typography/Headline';

const ButtonGhostExample = (): JSX.Element => {
  return (
    <Paper withBorder p='xl'>
      <Group spacing='sm' mb='xl'>
        <Headline variant='3' color='white'>
          Button
        </Headline>
        <Headline variant='3' color='neutral.3'>
          Ghost
        </Headline>
      </Group>

      <Button variant='ghostFilled'>New chat</Button>
    </Paper>
  );
};

export default ButtonGhostExample;

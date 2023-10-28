import React from 'react';

import { Group, Paper, SegmentedControl } from '@mantine/core';
import Headline from 'components/typography/Headline';

const SegmentedControlsExamples = (): JSX.Element => {
  return (
    <Paper withBorder p='xl'>
      <Group spacing='sm' mb='xl'>
        <Headline variant='3' color='white'>
          Segmented Control
        </Headline>
      </Group>

      <SegmentedControl
        data={[
          { label: 'React', value: 'react' },
          { label: 'Angular', value: 'ng' },
          { label: 'Vue', value: 'vue' },
          { label: 'Svelte', value: 'svelte' },
        ]}
      />
    </Paper>
  );
};

export default SegmentedControlsExamples;

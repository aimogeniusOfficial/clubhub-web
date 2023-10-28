import React from 'react';

import { Stack, Title } from '@mantine/core';

import ButtonPrimaryExample from './components/ButtonPrimaryExample';
import SegmentedControlExamples from './components/SegmentedControlExample';
import TableExample from './components/TableExample';
import ButtonGhostExample from './components/ButtonGhostExample';

const Uikit = (): JSX.Element => {
  return (
    <Stack p='xl' spacing='xl'>
      <Title>Uikit 🎨</Title>

      <TableExample />
      <SegmentedControlExamples />
      <ButtonPrimaryExample />
      <ButtonGhostExample />
    </Stack>
  );
};

export default Uikit;

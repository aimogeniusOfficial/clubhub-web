import React from 'react';

import { Stack, Title } from '@mantine/core';
import { GrowSpaceRow } from 'types/generated';

import JournalEntryList from '../../Home/components/JournalEntryList';

interface GrowSpaceEntriesTabProps {
  growSpace: GrowSpaceRow;
}
const GrowSpaceEntriesTab = ({ growSpace }: GrowSpaceEntriesTabProps): JSX.Element => {
  return (
    <Stack>
      <Title order={3}>Grow Space Related Entries</Title>
      <JournalEntryList growSpaceId={growSpace.id} />
    </Stack>
  );
};

export default GrowSpaceEntriesTab;

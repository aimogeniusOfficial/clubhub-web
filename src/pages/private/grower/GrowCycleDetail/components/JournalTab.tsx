import React from 'react';

import { Stack } from '@mantine/core';
import CreateJournalEntry from 'pages/private/grower/Home/components/entryCreate/CreateJournalEntry';
import JournalEntryList from 'pages/private/grower/Home/components/JournalEntryList';
import { GrowCycleRow } from 'types/generated';

const JournalTab = ({ growCycle }: { growCycle: GrowCycleRow }): JSX.Element => {
  return (
    <Stack>
      <CreateJournalEntry growCycleId={growCycle.id} />
      <JournalEntryList growCycleId={growCycle.id} />
    </Stack>
  );
};

export default JournalTab;

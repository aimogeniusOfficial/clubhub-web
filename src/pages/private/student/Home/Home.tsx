import React from 'react';

import { Stack } from '@mantine/core';

import CreateJournalEntry from './components/entryCreate/CreateJournalEntry';
import JournalEntryList from './components/JournalEntryList';

const Home = (): JSX.Element => {
  return (
    <Stack>
      <CreateJournalEntry />
      <JournalEntryList />
    </Stack>
  );
};

export default Home;

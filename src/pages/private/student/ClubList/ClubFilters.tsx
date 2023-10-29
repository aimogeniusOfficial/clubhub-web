import { Button, Group, Select, Stack, TextInput, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

const ClubFilters = (): JSX.Element => {
  return (
    <Stack h='80vh'>
      <Group position='apart'>
        <Title order={3}>Filters</Title>
        <Button variant='white'>Clear</Button>
      </Group>
      <TextInput placeholder='Search for a club...' icon={<IconSearch size='0.8rem' />} />
      <Select
        defaultValue='Sort By: Relevance'
        searchable
        data={['Sort By: Relevance', 'Sort By: Number of members']}
      />
    </Stack>
  );
};

export default ClubFilters;

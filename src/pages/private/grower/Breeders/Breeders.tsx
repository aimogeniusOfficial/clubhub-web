import React from 'react';

import {
  Container,
  Divider,
  Flex,
  Stack,
  Title,
  Text,
  Tabs,
  Group,
  SimpleGrid, TextInput
} from "@mantine/core";
import { useForm } from '@mantine/form';
import { IconBorderAll, IconLayoutDashboard, IconSearch } from "@tabler/icons-react";
import usePaginatedBreeders from 'hooks/breeders/usePaginatedBreeders';

import BreedersButtonsGroup from './components/BreederButtonsGroup';
import BreederList from './components/BreederList';
import BreedersFilters from './components/BreedersFilters';
import BreedersTable from './components/BreedersTable';

const Breeders = (): JSX.Element => {
  const filtersForm = useForm({
    initialValues: {
      searchValue: '',
    },
  });

  const { data: paginatedBreedersData, isLoading } = usePaginatedBreeders(
    filtersForm.values.searchValue,
  );

  return (
    <Container maw='936px'>
      <Stack spacing='lg'>
        <Flex direction='column'>
          <Title order={1} weight={700} color='neutral.0'>
            Breeders
          </Title>
          <Text color='neutral.3'>Explore breeders accross the world</Text>
        </Flex>

        <Divider />
            <BreedersButtonsGroup form={filtersForm} />
        <Tabs radius='xs' defaultValue='cards'>
          <Tabs.List>
            <Tabs.Tab value='table' icon={<IconBorderAll size='0.8rem' />}>
              Table
            </Tabs.Tab>
            <Tabs.Tab value='cards' icon={<IconLayoutDashboard size='0.8rem' />}>
              Cards
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value='cards' pt='xs'>
            {paginatedBreedersData?.data && <BreederList breeders={paginatedBreedersData.data} />}
          </Tabs.Panel>

          <Tabs.Panel value='table' pt='xs'>
            {paginatedBreedersData?.data && <BreedersTable breeders={paginatedBreedersData.data} />}
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
};
export default Breeders;

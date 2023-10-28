import React from 'react';

import { Group, Paper, Stack, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import LoadingOverlay from 'components/states/LoadingOverlay';
import usePaginatedPlants from 'hooks/plants/usePaginatedPlants';

import PlantButtonsGroup from './components/PlantButtonsGroup';
import PlantFilters from './components/PlantFilters';
import PlantList from './components/PlantList';

const PlantManagement = (): JSX.Element => {
  const filtersForm = useForm({
    initialValues: {
      searchValue: '',
      plantTypeId: '',
      breederId: '',
    },
  });

  const { data: paginatedPlants, isLoading } = usePaginatedPlants(
    filtersForm.values.breederId,
    filtersForm.values.plantTypeId,
    filtersForm.values.searchValue,
  );

  return (
    <div style={{ position: 'relative' }}>
      <LoadingOverlay visible={isLoading} />
      <Paper radius='xl' p='xl' shadow='sm'>
        <Stack spacing='lg'>
          <Group position='apart'>
            <Title order={3}>Plants</Title>
            <PlantButtonsGroup />
          </Group>
          <PlantFilters form={filtersForm} />
          {paginatedPlants?.data && <PlantList plants={paginatedPlants?.data} />}
        </Stack>
      </Paper>
    </div>
  );
};

export default PlantManagement;

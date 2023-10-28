import React, { useState } from 'react';

import { Select, SimpleGrid, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';
import usePaginatedBreeders from 'hooks/breeders/usePaginatedBreeders';
import { getFormattedSelectData } from 'utils/functions';

interface PlantFiltersProps {
  form: UseFormReturnType<
    { searchValue: string; plantTypeId: string; breederId: string },
    (values: { searchValue: string; plantTypeId: string; breederId: string }) => {
      searchValue: string;
      plantTypeId: string;
      breederId: string;
    }
  >;
}
const PlantFilters = ({ form }: PlantFiltersProps): JSX.Element => {
  const { data: breederData } = usePaginatedBreeders();

  const [searchInput, setSearchInput] = useState('');

  return (
    <SimpleGrid cols={4} mb='md' breakpoints={[{ maxWidth: 600, cols: 1, spacing: 'sm' }]}>
      <TextInput
        placeholder='Search by name'
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
        icon={<IconSearch size='1rem' />}
        onKeyUp={e => {
          if (e.key === 'Enter') {
            form.setFieldValue('searchValue', searchInput);
          }
        }}
      />
      {/*<Select*/}
      {/*  placeholder='Plant type'*/}
      {/*  data={getFormattedSelectData(plantTypesData?.data)}*/}
      {/*  clearable*/}
      {/*  required*/}
      {/*  {...form.getInputProps('plantTypeId')}*/}
      {/*/>*/}
      <Select
        placeholder='Breeder'
        data={getFormattedSelectData(breederData?.data)}
        clearable
        required
        {...form.getInputProps('breederId')}
      />
    </SimpleGrid>
  );
};

export default PlantFilters;

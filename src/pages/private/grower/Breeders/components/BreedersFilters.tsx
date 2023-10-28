import React, { useEffect, useState } from 'react';

import { Select, SimpleGrid, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';
import usePaginatedBreeders from 'hooks/breeders/usePaginatedBreeders';
import useSupabase from 'hooks/useSupabase';
import { getFormattedSelectData } from 'utils/functions';

interface BreederFiltersProps {
  form: UseFormReturnType<
    { searchValue: string },
    (values: { searchValue: string }) => { searchValue: string }
  >;
}

const BreedersFilters = ({ form }: BreederFiltersProps): JSX.Element => {
  const { data: breederData } = usePaginatedBreeders();
  const updateTextFilter = (value: string) => {
    form.setFieldValue('searchValue', value);
  };

  return (
    <SimpleGrid cols={4} mb='md' breakpoints={[{ maxWidth: 600, cols: 1, spacing: 'sm' }]}>
      <TextInput
        placeholder='Search by name'
        icon={<IconSearch size='1rem' />}
        onChange={event => updateTextFilter(event.target.value)}
      />
    </SimpleGrid>
  );
};

export default BreedersFilters;

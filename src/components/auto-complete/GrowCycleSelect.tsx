import React from 'react';

import { Loader, Select, SelectItem, SelectProps } from '@mantine/core';
import usePaginatedGrowCycle from 'hooks/grow-cycle/usePaginatedGrowCycle';
import useUserGrowCycles from 'hooks/grow-cycle/useUserGrowCycles';

interface IGrowCycleStatusSelectProps extends Omit<SelectProps, 'data' | 'error'> {
  userId: string;
}
const GrowCycleSelect = ({
  userId,
  icon,
  disabled,
  size,
  ...selectProps
}: IGrowCycleStatusSelectProps): JSX.Element => {
  const { data, isLoading, isFetching, isError } = usePaginatedGrowCycle({ userId });
  const { data: userGrowCycles } = useUserGrowCycles({ userId });

  const formattedData: SelectItem[] | string[] = data?.data
    ? data.data.map(({ id, name }) => ({ value: id, label: name }))
    : [];

  return (
    <Select
      {...selectProps}
      data={formattedData}
      icon={isLoading || isFetching ? <Loader size={size} /> : icon}
      error={isError ? 'Something went wrong while fetching data!' : undefined}
      disabled={isLoading || isFetching || isError || disabled}
    />
  );
};

export default GrowCycleSelect;

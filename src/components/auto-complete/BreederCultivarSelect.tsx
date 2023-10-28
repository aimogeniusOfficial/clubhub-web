import React, { ReactElement } from 'react';

import {
  Alert,
  Anchor,
  Box,
  Flex,
  Loader,
  Select,
  SelectItem,
  SelectProps,
  Space,
  Text,
} from '@mantine/core';
import usePaginatedGrowCycle from 'hooks/grow-cycle/usePaginatedGrowCycle';
import useUserGrowCycles from '../../hooks/grow-cycle/useUserGrowCycles';
import useGrowSpace from '../../hooks/grow-space/useGrowSpace';
import useUserGrowSpace from '../../hooks/grow-space/useUserGrowSpace';
import useUserSeedCultivars from '../../hooks/cultivars/useUserSeedCultivars';
import { IconAlertCircle, IconArrowNarrowRight } from '@tabler/icons-react';
import useBreederCultivars from '../../hooks/cultivars/useBreederCultivars';

const BreederCultivarSelect = ({ icon, disabled, size, ...selectProps }: any): ReactElement => {
  const { data: cultivars, isLoading, isFetching, isError } = useBreederCultivars();

  const formattedData: SelectItem[] = cultivars
    ? cultivars.map(cultivar => {
        const label = `${cultivar.breeder.name} - ${cultivar.name}`;
        return { value: cultivar.id.toString(), label: label };
      })
    : [];

  return (
    <>
      <Select
        label='Verified Breeder Cultivar'
        {...selectProps}
        data={formattedData}
        icon={isLoading || isFetching ? <Loader size={size} /> : icon}
        error={isError ? 'Something went wrong while fetching data!' : undefined}
        disabled={isLoading || isFetching || isError || disabled}
      />
    </>
  );
};

export default BreederCultivarSelect;

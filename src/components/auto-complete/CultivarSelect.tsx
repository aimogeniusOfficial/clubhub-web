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

const CultivarSelect = ({ icon, disabled, size, ...selectProps }: any): ReactElement => {
  const { data: cultivars, isLoading, isFetching, isError } = useUserSeedCultivars();

  const formattedData: SelectItem[] = cultivars
    ? cultivars.map(cultivar => {
        if (cultivar.plantType === 'Cannabis') {
          const seedType = cultivar.seedType === 'REGULAR' ? 'REG' : 'FEM';
          const growthType = cultivar.growthType === 'PHOTOPERIOD' ? 'PHOTO' : 'AUTO';
          const label = `${cultivar.name} (${growthType}) [${seedType}]`;

          return { value: cultivar.id, label };
        }
        const label = `${cultivar.plantType} - ${cultivar.name}`;

        return { value: cultivar.id, label };
      })
    : [];

  return (
    <>
      <Select
        label='Cultivar'
        {...selectProps}
        data={formattedData}
        icon={isLoading || isFetching ? <Loader size={size} /> : icon}
        error={isError ? 'Something went wrong while fetching data!' : undefined}
        disabled={isLoading || isFetching || isError || disabled}
      />
      {cultivars?.length === 0 && (
        <Alert icon={<IconAlertCircle size='1rem' />} title='No Cultivar!' color='yellow'>
          <Box>Please create your first cultivar before creating grow cycle</Box>
          <Anchor href='/my-cultivars' color='yellow' underline>
            <Flex align='center'>
              <IconArrowNarrowRight size='1rem' />
              <Space w='xs' />
              <Text>Create Your Cultivar Here </Text>
            </Flex>
          </Anchor>
        </Alert>
      )}
    </>
  );
};

export default CultivarSelect;

import React, { useState } from 'react';

import { Avatar, Center, Loader, SimpleGrid } from '@mantine/core';
import { useDisclosure, useShallowEffect } from '@mantine/hooks';
import { IconFileAlert } from '@tabler/icons-react';
import EmptyState from 'components/states/EmptyState';
import { useAuth } from 'contexts/AuthContext';
import usePaginatedGrowCycle from 'hooks/grow-cycle/usePaginatedGrowCycle';
import { GrowCycleRow } from 'types/generated';

import DrawerCreateGrowCycle from './DrawerCreateGrowCycle';
import GrowCycleCard from './GrowCycleCard';

const GrowCycleTable = (): JSX.Element => {
  const { user } = useAuth();

  const { data, isLoading, isError, isSuccess } = usePaginatedGrowCycle({
    userId: user.id,
  });

  const [tableData, setTableData] = useState<GrowCycleRow[]>([]);
  const [selectedGrowCycleId, setSelectedGrowCycleId] = useState<string | undefined>(undefined);
  const [isEditFormOpened, { close: closeEditForm }] = useDisclosure(false);

  // const handleEdit = (growCycleId: string): void => {
  //   setSelectedGrowCycleId(growCycleId);
  //   openEditForm();
  // };
  const handleCloseEditForm = (): void => {
    setSelectedGrowCycleId(undefined);
    closeEditForm();
  };

  useShallowEffect(() => {
    if (isSuccess && data?.data) {
      setTableData(data.data);
    }
  }, [isSuccess, data?.data]);

  return (
    <>
      {isLoading && (
        <Center>
          <Loader />
        </Center>
      )}

      {isError && (
        <EmptyState
          mt='xl'
          title='Error'
          description='Something went wrong while fetching data.'
          Icon={
            <Avatar radius='100%' size='xl' variant='light' color='red'>
              <IconFileAlert size={25} />
            </Avatar>
          }
        />
      )}

      <SimpleGrid
        cols={2}
        breakpoints={[
          {
            maxWidth: 'xs',
            cols: 1,
          },
          {
            maxWidth: 'md',
            cols: 2,
          },
          {
            minWidth: 'md',
            cols: 3,
          },
        ]}
      >
        {tableData.map(({ id, name, status, description, startDate, endDate }) => (
          <GrowCycleCard
            key={id}
            id={id}
            name={name}
            status={status}
            description={description}
            startDate={startDate}
            endDate={endDate}
          />
        ))}
      </SimpleGrid>

      {user?.id ? (
        <DrawerCreateGrowCycle
          opened={isEditFormOpened && !!selectedGrowCycleId}
          onClose={handleCloseEditForm}
        />
      ) : null}
    </>
  );
};

export default GrowCycleTable;

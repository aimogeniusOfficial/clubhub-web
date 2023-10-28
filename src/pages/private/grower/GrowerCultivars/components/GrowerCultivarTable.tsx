import React, { ReactElement } from 'react';

import Table from 'components/Table';
import useGrowerCultivars from 'hooks/grower-cultivars/useGrowerCultivars';
import { GrowCycleRow } from '../../../../../types/generated';
import { ActionIcon, Group, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import useDeleteGrowerCultivar from '../../../../../hooks/grower-cultivars/useDeleteGrowerCultivar';
import { showSuccessNotification } from '../../../../../utils/notifications';
import { modals } from '@mantine/modals';

const GrowerCultivarTable = (): ReactElement => {
  const theme = useMantineTheme();
  const { data: tableData } = useGrowerCultivars('Cannabis');
  const deleteGrowerCultivar = useDeleteGrowerCultivar();

  const handleDelete = (id: string): void => {
    modals.openConfirmModal({
      title: 'Delete Cultivar',
      centered: true,
      children: <Text size='sm'>Are you sure you want to delete this cultivar?</Text>,
      labels: { cancel: "No don't delete it", confirm: 'Delete Cultivar' },
      confirmProps: { color: theme.colors.accent[0] },
      onConfirm: () => {
        deleteGrowerCultivar.mutate(id, {
          onSuccess: () => {
            showSuccessNotification('Cultivar successfully deleted.');
          },
          onError: error => {
            showSuccessNotification('Failed to delete cultivar', error.message);
          },
        });
      },
    });
  };

  const columns = [
    {
      Header: 'Cultivar',
      accessor: 'name',
      Cell: ({ row }: { row: any }) => <>{`${row.original.name}`}</>,
    },
    {
      Header: () => <span>Description</span>,
      accessor: 'description' as const,
      Cell: ({ row }: { row: any }) => <>{`${row.original.description}`}</>,
      disableSortBy: true,
    },
    {
      Header: () => <span>Growth Type</span>,
      accessor: 'growthType' as const,
      Cell: ({ row }: { row: any }) => <>{`${row.original.growthType}`}</>,
    },
    {
      Header: () => <span>Seed Type</span>,
      accessor: 'seedType' as const,
      Cell: ({ row }: { row: any }) => <>{`${row.original.seedType}`}</>,
    },
    {
      Header: 'Actions',
      Cell: ({ row }: { row: { original: GrowCycleRow } }) => (
        <Group spacing='xs' noWrap>
          <Tooltip label='Delete' openDelay={500}>
            <ActionIcon color='red' onClick={() => handleDelete(row.original.id)}>
              <IconTrash size={theme.fontSizes.xl} />
            </ActionIcon>
          </Tooltip>
        </Group>
      ),
      disableSortBy: true,
    },
  ];

  return <>{Array.isArray(tableData) && <Table data={tableData} columns={columns} />}</>;
};
export default GrowerCultivarTable;

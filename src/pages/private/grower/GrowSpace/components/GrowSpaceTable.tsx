import React, { useEffect, useState } from 'react';

import { ActionIcon, Group, Menu, Skeleton, Text, Title, useMantineTheme } from '@mantine/core';
import { IconDots, IconEye } from '@tabler/icons-react';
import LoadingOverlay from 'components/states/LoadingOverlay';
import Table from 'components/Table';
import { Link, useNavigate } from 'react-router-dom';

import GrowSpaceImg from './GrowSpaceImg';

const getActiveGrowCyclesCount = (growCycles: Array<any>): number => {
  return growCycles.filter(cycle => ['draft', 'active'].includes(cycle.status)).length;
};

const getFinishedGrowCyclesCount = (growCycles: Array<any>): number => {
  return growCycles.filter(cycle => ['completed', 'cancelled'].includes(cycle.status)).length;
};
interface GrowSpaceTableProps {
  growSpaces: Array<any>;
  isLoading: boolean;
  isError: boolean;
}
const GrowSpaceTable = ({ growSpaces, isLoading, isError }: GrowSpaceTableProps): JSX.Element => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const [tableData, setTableData] = useState<Array<any>>([]);

  useEffect(() => {
    if (!isLoading && growSpaces) {
      setTableData(growSpaces);
    }
  }, [growSpaces, isLoading]);

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({ row }: { row: { original: any } }) => {
        return (
          <Group spacing='xl'>
            <GrowSpaceImg
              spaceType={row.original.spaceType}
              environment={row.original.environment}
              width={90}
              height={56}
            />
            <div>
              <Title order={4}>{row.original.name}</Title>
              <Text size='xs' color='dimmed'>
                Location: {row.original.location}
              </Text>
            </div>
          </Group>
        );
      },
    },
    {
      Header: 'Active Grow Cycles',
      id: 'activeGrowCycles',
      disableSortBy: true,
      Cell: ({ row }: { row: { original: any } }) => {
        return <>{getActiveGrowCyclesCount(row.original.GrowCycle)}</>;
      },
    },
    {
      Header: 'Finished Grow Cycles',
      id: 'finishedGrowCycles',
      disableSortBy: true,
      Cell: ({ row }: { row: { original: any } }) => {
        return <>{getFinishedGrowCyclesCount(row.original.GrowCycle)}</>;
      },
    },
    {
      id: 'action',
      disableSortBy: true,
      Cell: ({ row }: { row: { original: any } }) => (
        <Menu>
          <Menu.Target>
            <ActionIcon
              onClick={e => {
                e.stopPropagation();
              }}
            >
              <IconDots size={theme.fontSizes.md} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              icon={<IconEye size={theme.fontSizes.md} />}
              component={Link}
              to={`/grow-space/${row.original.id}`}
            >
              Preview
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ),
    },
  ];

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <LoadingOverlay visible={isLoading} />
      {Array.isArray(tableData) && (
        <Table
          data={tableData}
          columns={columns}
          mih={200}
          onRowClick={row => navigate(`/grow-space/${row.id}`)}
        />
      )}
    </>
  );
};

export default GrowSpaceTable;

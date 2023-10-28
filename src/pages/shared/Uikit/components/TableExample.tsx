import React from 'react';

import { Button, Group, Paper } from '@mantine/core';
import Table from 'components/Table/Table';
import Headline from 'components/typography/Headline';
import { tableData } from 'mocks/data';

const TableExample = (): JSX.Element => {
  const columns = [
    {
      Header: 'Any custom label for header',
      accessor: 'id',
    },
    {
      Header: 'Brand',
      accessor: 'brand',
    },
    {
      Header: 'Series',
      accessor: 'series' as const,
      Cell: ({ value }: { value: string }) => <Button variant='light'>Buy {value}</Button>,
      disableSortBy: true,
    },
  ];
  return (
    <Paper withBorder p='xl'>
      <Group spacing='sm' mb='xl'>
        <Headline variant='3' color='white'>
          Table
        </Headline>
      </Group>

      <Table columns={columns} data={tableData} />
    </Paper>
  );
};

export default TableExample;

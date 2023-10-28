import { Group, SimpleGrid, Title } from '@mantine/core';
import Table from 'components/Table';
import { Link } from 'react-router-dom';
import { BreederRow } from 'types/generated';

import BreedersButtonsGroup from './BreederButtonsGroup';

interface BreedersTableProps {
  breeders: BreederRow[];
}
const BreedersTable = ({ breeders }: BreedersTableProps) => {

  const columns = [
    {
      Header: 'Breeder',
      accessor: 'name',
      Cell: ({ row: { original } }: { row: { original: BreederRow } }) => (
        <Group spacing='xl'>
          <Link
            to={`/breeders/${original.id}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <Title order={4}>{original.name}</Title>
          </Link>
        </Group>
      ),
    },
    {
      Header: 'State',
      accessor: 'state' as const,
      Cell: ({ value }: { value: string }) => <>{`${value}`}</>,
    },
    {
      Header: 'Country',
      accessor: 'country' as const,
      Cell: ({ value }: { value: number }) => <>{`${value}`}</>,
    },
  ];

  return (
    <>
      {breeders && <Table data={breeders} columns={columns} />}
    </>
  );
};
export default BreedersTable;

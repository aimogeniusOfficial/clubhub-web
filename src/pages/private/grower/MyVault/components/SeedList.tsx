import { Group, Paper, SimpleGrid, Tabs, TextInput } from '@mantine/core';

import { UseFormReturnType } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';
import Table from 'components/Table';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SeedVaultWithCultivarsRow } from 'types/generated';
import SeedsButtonsGroup from './SeedsButtonsGroup';
import useVaultSeeds from 'hooks/seed-vault/useVaultSeeds';
import CultivarCard from 'components/CultivarCard';

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

interface PlantFiltersProps {
  form: UseFormReturnType<
    { searchValue: string },
    (values: { searchValue: string }) => { searchValue: string }
  >;
}

const SeedList = ({ form }: PlantFiltersProps) => {
  const [searchInput, setSearchInput] = useState(form.values.searchValue);
  const [tableData, setTableData] = useState<Array<SeedVaultWithCultivarsRow>>([]);
  const [wishListData, setWishListData] = useState<Array<SeedVaultWithCultivarsRow>>([]);
  const { data: vaultSeeds, isLoading } = useVaultSeeds();

  useEffect(() => {
    setSearchInput(form.values.searchValue);
  }, [form.values.searchValue]);

  useEffect(() => {
    if (!isLoading && vaultSeeds) {
      setTableData(vaultSeeds);
      // setWishListData(vaultSeeds.data.filter(seed => seed.cultivars && seed.isOnWithList));
    }
  }, [vaultSeeds, isLoading, form.values]);

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({ row }: { row: any }) => (
        <Link to={`/cultivars/${row.original.cultivarId}`} style={linkStyle}>
          <>{`${row.original.cultivarName}`}</>
        </Link>
      ),
    },
    {
      Header: 'Avaialable Seeds',
      accessor: 'AVAILABLE' as const,
      Cell: ({ value }: { value: number }) => <>{`${value}`}</>,
    },
    {
      Header: 'Locked',
      accessor: 'LOCKED' as const,
      Cell: ({ value }: { value: number }) => <>{`${value}`}</>,
    },
    {
      Header: 'Germinated',
      accessor: 'GERMINATED' as const,
      Cell: ({ value }: { value: number }) => <>{`${value}`}</>,
    },
  ];

  return (
    <>
      <Group position='apart'>
        <TextInput
          placeholder='Search by name'
          value={searchInput}
          onChange={e => {
            setSearchInput(e.target.value);
            form.setFieldValue('searchValue', e.target.value);
          }}
          icon={<IconSearch />}
        />
        <SeedsButtonsGroup />
      </Group>
      <Paper radius='lg' p='md' shadow='sm' mih='500px'>
        <Tabs radius='xs' defaultValue='my-seeds'>
          <Tabs.List>
            <Tabs.Tab value='my-seeds'>My Seeds</Tabs.Tab>
            <Tabs.Tab value='wish-list'>Wish List</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value='my-seeds' pt='xs'>
            {Array.isArray(tableData) && <Table data={tableData} columns={columns} />}
          </Tabs.Panel>
          <Tabs.Panel value='wish-list' pt='xs'>
            <SimpleGrid
              cols={4}
              breakpoints={[
                { maxWidth: 'xl', cols: 4, spacing: 'md' },
                { maxWidth: 'lg', cols: 3, spacing: 'sm' },
                { maxWidth: 'sm', cols: 2, spacing: 'xs' },
                { maxWidth: 'xs', cols: 1, spacing: 'sm' },
              ]}
            >
              {Array.isArray(wishListData) &&
                wishListData.map(wishListSeed => {
                  const wishListCultivar = wishListSeed.cultivars;
                  const breederId = wishListCultivar.breederId ? wishListCultivar.breederId : -1;
                  return (
                    <CultivarCard
                      key={wishListCultivar.id}
                      id={wishListCultivar.id.toString()}
                      name={wishListCultivar.name}
                      image={wishListCultivar.imageUrl}
                      breeder_id={breederId}
                    />
                  );
                })}
            </SimpleGrid>
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </>
  );
};
export default SeedList;

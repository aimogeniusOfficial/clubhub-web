import React, { useEffect, useState } from 'react';

import {
  ActionIcon,
  Badge,
  Group,
  useMantineTheme,
  SimpleGrid,
  Select,
  TextInput,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconSearch, IconHeart, IconHeartFilled } from '@tabler/icons-react';
import Table from 'components/Table';
import usePaginatedBreeders from 'hooks/breeders/usePaginatedBreeders';
import usePaginatedCultivars from 'hooks/cultivars/usePaginatedCultivars';
import useAddSeed from 'hooks/seed-vault/useAddSeed';
import useGetMySeeds from 'hooks/seed-vault/useGetMySeeds';
import useRemoveFromWishList from 'hooks/seed-vault/useRemoveFromWishList';
import { Link } from 'react-router-dom';
import { CultivarRow, SeedVaultRow } from 'types/generated';
import { getFormattedSelectData } from 'utils/functions';

import CultivarsButtonsGroup from './CultivarsButtonsGroup';

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

/**
 *
 * What is needed for List components
 * 1. LoadingOverlay
 * 2. Table and columns
 * 3. usePaginatedStrains - to get the data - used as tableData
 *
 * Important data returned needs
 */

interface CultivarListProps {
  form: UseFormReturnType<
    { searchValue: string; breederId: string },
    (values: { searchValue: string; breederId: string }) => {
      searchValue: string;
      breederId: string;
    }
  >;
}

const CultivarsList = ({ form }: CultivarListProps): JSX.Element => {
  const theme = useMantineTheme();
  // const addSeed = useAddSeed();
  const removeFromWishList = useRemoveFromWishList();
  const { data, isLoading } = usePaginatedCultivars(form.values.searchValue, form.values.breederId);

  const { data: breederData } = usePaginatedBreeders();

  const [searchInput, setSearchInput] = useState(form.values.searchValue);
  const [myCultivars, setMyCultivars] = useState<Array<SeedVaultRow>>([]);
  const [wishListCultivarIds, setWishListCultivarIds] = useState<Array<string>>([]);

  // const { data: mySeeds } = useGetMySeeds();

  useEffect(() => {
    setSearchInput(form.values.searchValue);
  }, [form.values.searchValue]);

  const [tableData, setTableData] = useState<Array<CultivarRow>>([]);

  useEffect(() => {
    if (!isLoading && data?.data) {
      setTableData(data.data);
    }
  }, [data, isLoading, form.values]);

  const handleLikeButton = (cultivar_id: number): void => {
    const payload = { cultivar_id };
    if (wishListCultivarIds.includes(cultivar_id.toString())) {
      removeFromWishList.mutate(payload, {
        onSuccess: () => {
          setWishListCultivarIds(wishListCultivarIds.filter(id => id !== cultivar_id.toString()));
        },
      });
    }
  };

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({ row }: { row: { original: CultivarRow } }) => {
        const { name } = row.original;
        return (
          <Link to={`/cultivars/${row.original.id}`} style={linkStyle}>
            {name}
          </Link>
        );
      },
    },
    {
      Header: () => <span>Breeder</span>,
      accessor: 'breeder' as const,
      Cell: ({ row }: { row: any }) => <>{`${row.original.Breeder.name}`}</>,
    },
    {
      Header: 'Description',
      accessor: 'description' as const,
      Cell: ({ row }: { row: any }) => {
        const isInWishList = wishListCultivarIds.includes(row.original.id.toString());
        // const seedInVault = myCultivars.find(
        //   seed => seed.cultivarId === row.original.id.toString(),
        // );
        return (
          <Group position='apart' noWrap>
            <>{`${row.original.description}`}</>
            <Group position='right' noWrap>
              {/*{seedInVault && <Badge color='green'>{`${seedInVault.amount} seeds`}</Badge>}*/}
              <ActionIcon radius='xl' onClick={() => handleLikeButton(row.original.id)}>
                {isInWishList ? (
                  <IconHeartFilled size={theme.fontSizes.lg} />
                ) : (
                  <IconHeart size={theme.fontSizes.lg} />
                )}
              </ActionIcon>
            </Group>
          </Group>
        );
      },
    },
  ];

  return (
    <>
      <SimpleGrid
        breakpoints={[
          { maxWidth: 'sm', cols: 1 },
          { minWidth: 'sm', cols: 2 },
        ]}
      >
        <Group>
          <TextInput
            placeholder='Search by name'
            value={searchInput}
            onChange={e => {
              setSearchInput(e.target.value);
              form.setFieldValue('searchValue', e.target.value);
            }}
            icon={<IconSearch />}
          />
          <Select
            placeholder='Breeder'
            data={getFormattedSelectData(breederData?.data)}
            clearable
            required
            {...form.getInputProps('breederId')}
          />
        </Group>

        <Group position='right'>
          <CultivarsButtonsGroup />
        </Group>
      </SimpleGrid>
      {/* <LoadingOverlay visible={isLoading} /> */}
      {Array.isArray(tableData) && <Table data={tableData} columns={columns} />}
    </>
  );
};
export default CultivarsList;

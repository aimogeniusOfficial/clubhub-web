import React from 'react';

import { Button, Group, SimpleGrid, TextInput, useMantineTheme } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import useProfile from 'hooks/auth/useProfile';
import usePaginatedBreeders from 'hooks/breeders/usePaginatedBreeders';
import useExportCsv from 'hooks/csv/useExportCsv';
import { isAdmin } from 'utils/roleAccessHelper';

import BreedersCreateModal from './BreederCreateModal';
import PlantCsvInsertModal from './BreederCsvInsertModal';

interface BreedersButtonsGroupProps {
  form: UseFormReturnType<
    { searchValue: string },
    (values: { searchValue: string }) => { searchValue: string }
  >;
}
const BreedersButtonsGroup = ({ form }: BreedersButtonsGroupProps): JSX.Element => {
  const { data: userProfile } = useProfile();
  const theme = useMantineTheme();
  const [isInsertModalOpen, { open: openInsertModal, close: closeInsertModal }] =
    useDisclosure(false);
  const [isBreederModalOpen, { open: openBreederModal, close: closeBreederModal }] =
    useDisclosure(false);
  const { data: breederData } = usePaginatedBreeders();
  const updateTextFilter = (value: string) => {
    form.setFieldValue('searchValue', value);
  };

  const exportCsv = useExportCsv();

  // const handleExportCsv = (): void => {
  //   exportCsv.mutate('breeders', {
  //     onSuccess: data => {
  //       const response = data as PostgrestSingleResponse<any>;
  //       const { data: responseData } = response;
  //       const blob = new Blob([responseData], { type: 'text/csv' });
  //       const url = URL.createObjectURL(blob);
  //       const link = document.createElement('a');
  //       link.href = url;
  //       link.download = 'Breeders.csv';
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     },
  //     onError: error => showErrorNotification('Failed to export Breeders', error.message),
  //   });
  // };

  return (
    <>
      <SimpleGrid
        breakpoints={[
          { maxWidth: 'sm', cols: 1 },
          { minWidth: 'sm', cols: 2 },
        ]}
      >
        <TextInput
          placeholder='Search by name'
          icon={<IconSearch size='1rem' />}
          onChange={event => updateTextFilter(event.target.value)}
        />
        {isAdmin(userProfile?.data) && (
          <Group position='right'>
            <Button
              leftIcon={<IconPlus size={theme.fontSizes.md} />}
              onClick={openBreederModal}
              size='xs'
            >
              Add breeder
            </Button>
          </Group>
        )}
      </SimpleGrid>
      <PlantCsvInsertModal opened={isInsertModalOpen} onClose={closeInsertModal} />
      {breederData?.data && (
        <BreedersCreateModal
          opened={isBreederModalOpen}
          onClose={closeBreederModal}
          breeders={breederData.data}
        />
      )}
    </>
  );
};

export default BreedersButtonsGroup;

import React from 'react';

import { Button, Group, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { IconPrinter, IconRowInsertTop, IconPlus } from '@tabler/icons-react';
import usePaginatedBreeders from 'hooks/breeders/usePaginatedBreeders';
import useExportCsv from 'hooks/csv/useExportCsv';
import { showErrorNotification } from 'utils/notifications';

import PlantCreateModal from './PlantCreateModal';
import PlantCsvInsertModal from './PlantCsvInsertModal';

const PlantButtonsGroup = (): JSX.Element => {
  const theme = useMantineTheme();
  const [isInsertModalOpen, { open: openInsertModal, close: closeInsertModal }] =
    useDisclosure(false);
  const [isPlantModalOpen, { open: openPlantModal, close: closePlantModal }] = useDisclosure(false);
  const { data: breederData } = usePaginatedBreeders();

  const exportCsv = useExportCsv();

  const handleExportCsv = (): void => {
    exportCsv.mutate('plants', {
      onSuccess: data => {
        const response = data as PostgrestSingleResponse<any>;
        const { data: responseData } = response;
        const blob = new Blob([responseData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'plants.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      onError: error => showErrorNotification('Failed to export plants', error.message),
    });
  };

  return (
    <>
      <Group>
        <Button
          leftIcon={<IconRowInsertTop size={theme.fontSizes.md} />}
          onClick={openInsertModal}
          size='xs'
        >
          Import CSV
        </Button>
        <Button
          leftIcon={<IconPrinter size={theme.fontSizes.md} />}
          onClick={handleExportCsv}
          size='xs'
        >
          Export
        </Button>
        <Button
          leftIcon={<IconPlus size={theme.fontSizes.md} />}
          onClick={openPlantModal}
          size='xs'
        >
          Add plant
        </Button>
      </Group>
      <PlantCsvInsertModal opened={isInsertModalOpen} onClose={closeInsertModal} />
      {/*{plantTypesData?.data && breederData?.data && (*/}
      {/*  <PlantCreateModal*/}
      {/*    opened={isPlantModalOpen}*/}
      {/*    onClose={closePlantModal}*/}
      {/*    plantTypes={plantTypesData.data}*/}
      {/*    breeders={breederData.data}*/}
      {/*  />*/}
      {/*)}*/}
    </>
  );
};

export default PlantButtonsGroup;

import React from 'react';

import { Button, Group, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import useProfile from 'hooks/auth/useProfile';
import useExportCsv from 'hooks/csv/useExportCsv';
import { isAdmin } from 'utils/roleAccessHelper';

import CultivarsCsvInsertModal from './CultivarsCsvInsertModal';
import CultivarsWriteModal from './CultivarsWriteModal';

const CultivarsButtonsGroup = (): JSX.Element => {
  const theme = useMantineTheme();
  const { data: userProfile } = useProfile();
  const [isInsertModalOpen, { open: openInsertModal, close: closeInsertModal }] =
    useDisclosure(false);
  const [isCultivarModalOpen, { open: openCultivarModal, close: closeCultivarModal }] =
    useDisclosure(false);

  const exportCsv = useExportCsv();

  // const handleExportCsv = (): void => {
  //   exportCsv.mutate('cultivars', {
  //     onSuccess: data => {
  //       const response = data as PostgrestSingleResponse<any>;
  //       const { data: responseData } = response;
  //       const blob = new Blob([responseData], { type: 'text/csv' });
  //       const url = URL.createObjectURL(blob);
  //       const link = document.createElement('a');
  //       link.href = url;
  //       link.download = 'Cultivars.csv';
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     },
  //     onError: error => showErrorNotification('Failed to export plants', error.message),
  //   });
  // };

  return (
    <>
      <Group>
        {/* TODO - Export and Import should not be available at the moment. It should be protected with permission */}
        {/* <Button
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
        </Button> */}

        {isAdmin(userProfile?.data) && (
          <Button
            leftIcon={<IconPlus size={theme.fontSizes.md} />}
            onClick={openCultivarModal}
            size='xs'
          >
            Add cultivar
          </Button>
        )}
      </Group>
      <CultivarsCsvInsertModal opened={isInsertModalOpen} onClose={closeInsertModal} />
      {isCultivarModalOpen && (
        <CultivarsWriteModal opened={isCultivarModalOpen} onClose={closeCultivarModal} isCreation />
      )}
    </>
  );
};

export default CultivarsButtonsGroup;

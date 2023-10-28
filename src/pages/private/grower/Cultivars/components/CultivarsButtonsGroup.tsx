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

  return (
    <>
      <Group>

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

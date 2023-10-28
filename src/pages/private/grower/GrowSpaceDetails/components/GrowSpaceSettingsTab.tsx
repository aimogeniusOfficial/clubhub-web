import React from 'react';

import { Stack, Title } from '@mantine/core';
import DeleteCard from 'components/cards/DeleteCard';

interface GrowSpaceSettingsTabProps {
  openDeleteModal: () => void;
}
const GrowSpaceSettingsTab = ({ openDeleteModal }: GrowSpaceSettingsTabProps): JSX.Element => {
  return (
    <>
      <Stack>
        <Title order={3}>Delete Grow Space</Title>
        <DeleteCard
          title='Deleting this Grow Space will delete all information about the Grow Space'
          description='Are you sure you want to proceed?'
          actionButton={{ text: 'Delete Grow Space', onClick: openDeleteModal }}
        />
      </Stack>
    </>
  );
};

export default GrowSpaceSettingsTab;

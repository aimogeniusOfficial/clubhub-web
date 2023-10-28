import React from 'react';

import { SimpleGrid } from '@mantine/core';
import LoadingOverlay from 'components/states/LoadingOverlay';

import GrowSpaceCard from './GrowSpaceCard';
import GrowSpaceEmpty from './GrowSpaceEmpty';

interface GrowSpaceCardsProps {
  growSpaces: Array<any>;
  openCreateModal: () => void;
  isLoading: boolean;
}
const GrowSpaceList = ({
  growSpaces,
  isLoading,
  openCreateModal,
}: GrowSpaceCardsProps): JSX.Element => {
  return (
    <>
      <LoadingOverlay visible={isLoading} />
      {growSpaces && (
        <SimpleGrid
          breakpoints={[
            {
              maxWidth: 'sm',
              cols: 1,
            },
            {
              minWidth: 'sm',
              cols: 2,
            },
          ]}
        >
          {' '}
          {Array.isArray(growSpaces) && growSpaces.length > 0 ? (
            growSpaces.map(growSpace => <GrowSpaceCard key={growSpace.id} growSpace={growSpace} />)
          ) : (
            <GrowSpaceEmpty openCreateModal={openCreateModal} />
          )}
        </SimpleGrid>
      )}
    </>
  );
};

export default GrowSpaceList;

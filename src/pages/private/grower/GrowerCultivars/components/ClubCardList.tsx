import React from 'react';
import { SimpleGrid } from '@mantine/core';
import ClubCard from './ClubCard';
import { ClubRow } from 'types/generated';
interface ClubsContainer {
  clubArray: ClubRow[]
}

const ClubCardList = ({
  clubArray }: ClubsContainer): JSX.Element => {
  return (
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
      {clubArray.map(club => <ClubCard club = {club} />)}

    </SimpleGrid>
  )};
export default ClubCardList;
import { useState } from 'react';

import { Grid } from '@mantine/core';
import { ClubRow } from 'types/generated';

import ClubDetails from './ClubDetails';
import ClubFilters from './ClubFilters';
import ClubScroll from './ClubScroll';

const ClubList = (): JSX.Element => {
  const [currentClub, setCurrentClub] = useState<ClubRow>();
  return (
    <Grid>
      <Grid.Col span={3}>
        <ClubFilters />
      </Grid.Col>
      <Grid.Col span={3}>
        <ClubScroll onClick={setCurrentClub} />
      </Grid.Col>
      <Grid.Col span={6}>{currentClub && <ClubDetails club={currentClub} />}</Grid.Col>
    </Grid>
  );
};

export default ClubList;

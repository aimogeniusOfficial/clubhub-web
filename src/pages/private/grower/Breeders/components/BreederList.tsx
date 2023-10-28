import React from 'react';

import { Stack } from '@mantine/core';
import { BreederRow } from 'types/generated';

import BreederCard from './BreederCard';

interface BreederListProps {
  breeders: BreederRow[];
}

const BreederList = ({ breeders }: BreederListProps): JSX.Element => {
  return (
    <Stack>
      {Array.isArray(breeders) &&
        breeders.map((breeder) => (
          <BreederCard key={breeder.id} breeder={breeder}  />
        ))}
    </Stack>
  );
};

export default BreederList;

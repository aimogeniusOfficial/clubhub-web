import React from 'react';

import { SimpleGrid } from '@mantine/core';
import PlantCard from 'components/cards/PlantCard';

interface PlantListProps {
  plants: any[];
}

const PlantList = ({ plants }: PlantListProps): JSX.Element => {
  return (
    <SimpleGrid
      cols={4}
      breakpoints={[
        { maxWidth: 'xl', cols: 4, spacing: 'md' },
        { maxWidth: 'lg', cols: 3, spacing: 'sm' },
        { maxWidth: 'sm', cols: 2, spacing: 'xs' },
        { maxWidth: 'xs', cols: 1, spacing: 'sm' },
      ]}
    >
      {Array.isArray(plants) &&
        plants.map(({ id, name, breeders, cultivars, plant_types }: any) => (
          <PlantCard
            key={id}
            id={id}
            image={cultivars?.image_url}
            title={name}
            plant_type={plant_types?.name}
            cultivar={cultivars?.name}
            breeder={breeders?.name}
          />
        ))}
    </SimpleGrid>
  );
};

export default PlantList;

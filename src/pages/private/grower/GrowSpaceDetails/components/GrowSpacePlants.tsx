import React from 'react';

import { Paper, Group, Title, Stack, SimpleGrid } from '@mantine/core';
import PlantCard from 'components/cards/PlantCard';

interface GrowSpacePlantsProps {
  plants: any[];
}
const GrowSpacePlants = ({ plants }: GrowSpacePlantsProps): JSX.Element => {
  return (
    <Paper withBorder radius='md' p='xs'>
      <Stack>
        <Group position='apart'>
          <Title order={2}>Plants</Title>
        </Group>
        {plants && (
          <SimpleGrid
            cols={4}
            breakpoints={[
              { maxWidth: 'xl', cols: 4, spacing: 'md' },
              { maxWidth: 'lg', cols: 3, spacing: 'sm' },
              { maxWidth: 'sm', cols: 1, spacing: 'sm' },
            ]}
          >
            {plants &&
              plants.map(({ id, name, image_url, breeder_id, cultivar_id, plant_type_id }: any) => (
                <PlantCard
                  key={id}
                  id={id}
                  image={image_url}
                  title={name}
                  plant_type={plant_type_id.name}
                  cultivar={cultivar_id.name}
                  breeder={breeder_id.name}
                />
              ))}
          </SimpleGrid>
        )}
      </Stack>
    </Paper>
  );
};

export default GrowSpacePlants;

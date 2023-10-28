import React from 'react';

import { Paper, Stack, Title, SimpleGrid, Text } from '@mantine/core';
import GrowCycleTable from 'pages/private/grower/GrowCycles/components/GrowCycleTable';
import { GrowSpaceRow } from 'types/generated';

interface GrowSpaceDetailsTabProps {
  growSpace: GrowSpaceRow;
}
const GrowSpaceDetailsTab = ({ growSpace }: GrowSpaceDetailsTabProps): JSX.Element => {
  return (
    <Stack>
      <Title order={3}>Details</Title>
      <Paper radius='lg' p='lg'>
        {growSpace && (
          <SimpleGrid
            breakpoints={[
              { maxWidth: 'sm', cols: 2 },
              { minWidth: 'sm', cols: 3 },
            ]}
            px='md'
          >
            <div>
              <Text>Size</Text>
              <Text>
                {/*<Text span size='lg' fw={600}>*/}
                {/*  {growSpace?.width} x {growSpace?.length} x {growSpace?.height}{' '}*/}
                {/*</Text>*/}
                {/*{getShorthandUnit()}*/}4 ft x 4 ft x 8 ft
              </Text>
            </div>
            <div>
              <Text>Grow Area</Text>
              <Text>
                <Text span size='lg' fw={600}>
                  {' '}
                </Text>
                16 sqft
              </Text>
            </div>
            <div>
              <Text>VPD</Text>
              <Text>
                <Text span size='lg' fw={600}>
                  1.1{' '}
                </Text>
                kPa
              </Text>
            </div>
            <div>
              <Text>Temperature</Text>
              <Text>
                <Text span size='lg' fw={600}>
                  73.0{' '}
                </Text>
                F
              </Text>
            </div>
            <div>
              <Text>Light Intensity</Text>
              <Text>
                <Text span size='lg' fw={600}>
                  900{' '}
                </Text>
                PPFD at 60% power
              </Text>
            </div>
            <div>
              <Text>Humidity</Text>
              <Text>
                <Text span size='lg' fw={600}>
                  55.0
                </Text>
                %
              </Text>
            </div>
          </SimpleGrid>
        )}
      </Paper>
      <Title order={3} mt='xs'>
        Grow Cycles
      </Title>
      <Paper radius='lg' p='lg'>
        {growSpace && (
          <GrowCycleTable />
          // <GrowCycleTable searchFilters={{ growSpaceId: growSpace?.id, name: '', status: '' }} />
        )}
      </Paper>
    </Stack>
  );
};

export default GrowSpaceDetailsTab;

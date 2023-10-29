import React from 'react';

import { Card, Group, Title, useMantineTheme, Stack, Badge, Text } from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import GrowSpaceImg from './GrowSpaceImg';

interface GrowSpaceCardProps {
  growSpace: any;
}

const GrowSpaceCard = ({ growSpace }: GrowSpaceCardProps): JSX.Element => {
  const theme = useMantineTheme();

  const { id, name, location, environment, spaceType } = growSpace;

  return (
    <Card
      component={Link}
      to={`/grow-space/${id}`}
      shadow='md'
      padding='lg'
      radius='md'
      bg='neutral.6'
      sx={{ border: `1px solid ${theme.colors.dark[5]}` }}
    >
      <Card.Section>
        <GrowSpaceImg environment={environment} spaceType={spaceType} />
      </Card.Section>

      <Stack mt='md' spacing='xs'>
        <Title order={4} weight={600} color='neutral.1'>
          {name}
        </Title>

        <Group spacing='xs' noWrap>
          <IconMapPin size={theme.fontSizes.md} color={theme.colors.neutral[2]} />
          <Text size='sm' color='neutral.2'>
            {location}
          </Text>
        </Group>

        <Group>
          <Badge>Temp - 73°F</Badge>
          <Badge>Hum - 50%</Badge>
          <Badge>20000 (lx)</Badge>
        </Group>
      </Stack>
    </Card>
  );
};

export default GrowSpaceCard;

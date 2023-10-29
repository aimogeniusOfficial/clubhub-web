import React from 'react';

import { Card, Image, Text, Badge, Stack, Title, Group } from '@mantine/core';
import { ClubRow } from 'types/generated';

interface ClubCardCreator {
  club: ClubRow;
}

const ClubCard = ({ club }: ClubCardCreator): JSX.Element => {
  return (
    <Card shadow='md' padding='lg' radius='md' bg='neutral.6'>
      <Card.Section>
        <Image src={club.logo_url} height={160} />
      </Card.Section>

      <Stack mt='md' spacing='xs'>
        <Title order={4} weight={600} color='neutral.1'>
          {club.name}
        </Title>

        <Text size='sm' c='dimmed'>
          {club.description}
        </Text>

        <Group>
          <Badge>{club.categoryId.name}</Badge>
          <Badge>Hum - 50%</Badge>
          <Badge>20000 (lx)</Badge>
        </Group>
      </Stack>
    </Card>
  );
};
export default ClubCard;

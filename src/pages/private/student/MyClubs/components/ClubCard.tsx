import React from 'react';
import {Card, Image, Text, Badge, Stack, Title, Group} from '@mantine/core';
import useGetClubs from '../../../../../hooks/clubs/useGetClubs';
import { ClubRow } from 'types/generated';

interface clubCardCreator {
  club: ClubRow;
}

const ClubCard = ( {club} : clubCardCreator): JSX.Element => {
    return (
      <Card
      shadow='md'
      padding='lg'
      radius='md'
      bg='neutral.6'
    >
       <Card.Section>
         <Image
           src="https://imageio.forbes.com/specials-images/imageserve/61b8a884233a9dec77c8d396/reMarkable-Review/0x0.jpg?format=jpg&crop=1620,1080,x198,y0,safe&width=1440"
           height={160}
           alt="Norway"
         />
       </Card.Section>

      <Stack mt='md' spacing='xs'>
        <Title order={4} weight={600} color='neutral.1'>
          {club.name}
        </Title>

        <Text size="sm" c="dimmed">
        {club.description}
      </Text>

        <Group>
          <Badge>{club.category}</Badge>
          <Badge>Hum - 50%</Badge>
          <Badge>20000 (lx)</Badge>
        </Group>
      </Stack>
    </Card>
  );
}
export default ClubCard;
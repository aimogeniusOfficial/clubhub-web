import React from 'react';

import {
  createStyles,
  Card,
  Text,
  Group,
  Divider,
  Title,
  Badge,
  HoverCard,
  ActionIcon,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import useBreeders from 'hooks/breeders/useBreeders';
import { IconBong, IconWind } from '@tabler/icons-react';

const useStyles = createStyles(theme => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.background[0],
    width: '100%',
    maxWidth: 300,
    '@media (max-width: 40em)': {
      maxWidth: '100%',
    },
  },

  image: {
    height: 160,
    objectFit: 'cover',
    cursor: 'pointer',
    '@media (max-width: 40em)': {
      height: 240,
    },
  },
}));

interface PlantCardProps {
  id: string;
  name: string;
  breeder_id: number;
  image: string | null;
}

const CultivarCard = ({
  id,
  name,
  breeder_id,
  image,
}: PlantCardProps): JSX.Element => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { data: breeder } = useBreeders(breeder_id.toString());
  const breederName = breeder?.data?.name;

  return (
    <Card withBorder p='lg' className={classes.card}>
      <Card.Section>
        {image ? 
          <img
            src={image}
            alt={name}
            width='100%'
            className={classes.image}
            onClick={() => navigate(`/cultivars/${id}`)}
          />
          :
          <img
            src={'https://media.istockphoto.com/id/1170016128/vector/plant-icon-on-black-background-black-flat-style-vector-illustration.jpg?s=170667a&w=0&k=20&c=OiKbmmiqohmwDN5DTG1oF9exxNj3Qq0Goy3aAPcYB9s='}
            alt={name}
            width='100%'
            className={classes.image}
            onClick={() => navigate(`/cultivars/${id}`)}
          />
        }
        <Divider />
        <Group position='left' spacing={0}>
          <HoverCard offset={-82}>
            <HoverCard.Target>
            <ActionIcon size={30} radius='xl' variant='subtle' color='green' ml={4}>
              <IconWind size={22} color='green' />
            </ActionIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="xs" fw={700}>
                <Text span c="accent.0" inherit>Smell</Text>: pinene
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
          <HoverCard offset={-82}>
            <HoverCard.Target>
            <ActionIcon size={30} radius='xl' variant='subtle' color='violet'>
              <IconBong size={22} color='purple' />
            </ActionIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="xs" fw={700}>
                <Text span c="accent.0" inherit>Effects</Text>: dizziness, warmness
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
        <Title order={6} px='xs' py={4}>
          {name}
        </Title>
      </Card.Section>
      <Card.Section px={6} pb='xs'>
        {breederName &&
          <Badge color='green' size='sm'>
            {breederName}
          </Badge>
        }
      </Card.Section>
    </Card>
  );
};

export default CultivarCard;

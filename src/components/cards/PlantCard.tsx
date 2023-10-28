import React from 'react';

import {
  createStyles,
  Card,
  Text,
  Group,
  Divider,
  Title,
  ActionIcon,
  MediaQuery,
  Stack,
} from '@mantine/core';
import { IconCannabis, IconCarrot } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

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

  footer: {
    padding: theme.spacing.xs,
  },

  image: {
    height: 160,
    objectFit: 'cover',
    cursor: 'pointer',
    '@media (max-width: 40em)': {
      height: 240,
    },
  },
  icon: {
    position: 'absolute',
    margin: theme.spacing.sm,
  },
}));

interface PlantCardProps {
  id: string;
  image: string;
  title: string;
  plant_type: string;
  cultivar: string;
  breeder: string;
}

enum PlantType {
  CANNABIS = 'Cannabis',
  VEGETABLE = 'Vegetable',
}

const PlantCard = ({
  id,
  image,
  title,
  plant_type,
  cultivar,
  breeder,
}: PlantCardProps): JSX.Element => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const footerData: { label: string; value: string }[] = [
    { label: 'Breeder:', value: breeder },
    { label: 'Cultivar:', value: cultivar },
  ];

  const getPlantIcon = (): JSX.Element => {
    switch (plant_type) {
      case PlantType.CANNABIS:
        return <IconCannabis size={22} />;
      case PlantType.VEGETABLE:
        return <IconCarrot size={22} />;
      default:
        return <IconCannabis size={22} />;
    }
  };

  return (
    <Card withBorder p='lg' className={classes.card}>
      <Card.Section>
        <img
          src={image}
          alt={title}
          width='100%'
          className={classes.image}
          onClick={() => navigate(`/plant/${id}`)}
        />
        <Divider />
        <ActionIcon size={38} radius='xl' variant='subtle' color='green'>
          {getPlantIcon()}
        </ActionIcon>
        <Title order={6} px='xs'>
          {title}
        </Title>
      </Card.Section>
      <Card.Section py='xs' px='xs' pb='xs'>
        {footerData.map(({ label, value }) => (
          <Stack>
            <MediaQuery smallerThan='md' styles={{ display: 'none' }}>
              <Group align='start' position='apart' key={label}>
                <Text size='xs' color='dimmed'>
                  {label}
                </Text>
                <Text weight={500} size='xs' maw='62%' align='right'>
                  {value}
                </Text>
              </Group>
            </MediaQuery>
            <MediaQuery largerThan='md' styles={{ display: 'none' }}>
              <Group align='start' position='left' key={label}>
                <Text size='xs' color='dimmed'>
                  {label}
                </Text>
                <Text weight={500} size='xs' maw='62%'>
                  {value}
                </Text>
              </Group>
            </MediaQuery>
          </Stack>
        ))}
      </Card.Section>
    </Card>
  );
};

export default PlantCard;

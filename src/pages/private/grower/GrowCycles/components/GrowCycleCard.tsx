import React from 'react';

import { Avatar, createStyles, Group, Paper, Stack, Text, useMantineTheme } from '@mantine/core';
import { IconContrast2 } from '@tabler/icons-react';
import GrowCycleStatusBadge from 'pages/private/grower/GrowCycleDetail/components/badges/GrowCycleStatusBadge';
import { Link } from 'react-router-dom';
import { GrowCycleRow } from 'types/generated';

const useStyles = createStyles(theme => ({
  card: {
    position: 'relative',
    overflow: 'hidden',
    border: `1px solid ${theme.colors.dark[5]}`,
    cursor: 'pointer',

    transitionProperty: 'border-color, box-shadow',
    transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',
    transitionDuration: '.15s',

    '&:hover': {
      borderColor: theme.colors.dark[4],
      boxShadow: theme.shadows.md,

      '& > :nth-child(1)': {
        transform: 'scale(1.9)',
        background: `radial-gradient(100% 100% at 0% 0%, ${theme.fn.rgba(
          theme.colors.primary[6],
          0.1,
        )}, transparent)`,

        transitionProperty: 'all',
        animationTimingFunction: 'cubic-bezier(0,0,.2,1)',
        animationDuration: '.7s',
        transitionDuration: '.7s',
        transitionTimingFunction: 'cubic-bezier(0,0,.2,1)',
      },
    },
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    top: 0,
    background: `radial-gradient(100% 100% at 0% 0%, ${theme.fn.rgba(
      theme.colors.primary[6],
      0.094,
    )}, transparent)`,
    width: 250,
    height: 150,
  },
}));

interface GrowCycleCardProps {
  id: string;
  name: string;
  status: GrowCycleRow['status'];
  description: string | null;
  startDate: string | null;
  endDate: string | null;
}

const GrowCycleCard = ({
  id,
  name,
  status,
  description,
  startDate,
  endDate,
}: GrowCycleCardProps): JSX.Element => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <Paper component={Link} to={`/grow-cycle/${id}`} p='xl' radius='md' className={classes.card}>
      <div className={classes.backgroundGradient} />
      <Stack spacing='lg'>
        <Group noWrap position='apart'>
          <Group noWrap>
            <Avatar radius='md' color='green' variant='light' size='md'>
              <IconContrast2 size={theme.fontSizes.lg} />
            </Avatar>
            <Text size='md' weight={600} color='neutral.0'>
              {name}
            </Text>
          </Group>
          <GrowCycleStatusBadge value={status} />
        </Group>
        <Text size='sm' color='netral.2' lh={1.2} lineClamp={3}>
          {description}
        </Text>
        <Group>
          <Stack spacing={0}>
            <Text color='neutral.3' size='xs'>
              Start Date
            </Text>
            <Text size='sm'>{startDate || 'None'}</Text>
          </Stack>
          <Stack spacing={0}>
            <Text color='neutral.3' size='xs'>
              End Date
            </Text>
            <Text size='sm'>{endDate || 'None'}</Text>
          </Stack>
        </Group>
      </Stack>
    </Paper>
  );
};

export default GrowCycleCard;

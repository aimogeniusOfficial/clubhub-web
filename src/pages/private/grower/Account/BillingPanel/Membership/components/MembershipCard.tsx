import React from 'react';

import { Card, Group, List, Stack, Text, ThemeIcon, createStyles, Title } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { SubscriptionPlanRow } from 'types/generated';

const useStyles = createStyles(theme => ({
  group: {
    maxWidth: 500,
  },

  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    width: '90%',
    paddingTop: 60,
    margin: 'auto',
  },

  section: {
    padding: theme.spacing.sm,
    borderTop: `1 solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

interface MembershipCardProps {
  membership: SubscriptionPlanRow;
  isAnnually: boolean;
}

const MembershipCard = ({ membership, isAnnually }: MembershipCardProps): JSX.Element => {
  const { classes } = useStyles();

  return (
    <Card withBorder radius='md' className={classes.card}>
      <Card.Section className={classes.section}>
        <Group position='apart'>
          <Title order={3} fw={600}>
            {membership.name}
          </Title>
          <Text fz='md' fw={500} align='right'>
            Starts at <br />
            <Text span fz='lg' fw={600}>
              {isAnnually ? `${membership.yearlyPrice}$` : `${membership.monthlyPrice}$`}
            </Text>
            {isAnnually ? '/yr' : '/mo'}
          </Text>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Stack spacing='xs'>
          <List
            spacing='xs'
            mb='lg'
            size='sm'
            center
            icon={
              <ThemeIcon color='green' size={18} radius='xl'>
                <IconCheck size={10} />
              </ThemeIcon>
            }
          >
            {/*{membership.membership_plan_features.map(feature => (*/}
            {/*  <List.Item key={feature.feature_id}>*/}
            {/*    {feature.membership_features.name}{' '}*/}
            {/*    {feature.limit_per_cycle ? `- ${feature.limit_per_cycle}` : ''}*/}
            {/*  </List.Item>*/}
            {/*))}*/}
          </List>
        </Stack>
      </Card.Section>
    </Card>
  );
};

export default MembershipCard;

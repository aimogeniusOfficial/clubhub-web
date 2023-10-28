import React from 'react';
import { SubscriptionPlanRow } from 'types/generated';
import { Badge, Divider, Group, Paper, Stack, Title, Text, Button } from '@mantine/core';

interface ReviewOrderProps {
  currentMembership: SubscriptionPlanRow | undefined;
  handleSubscribe: () => void;
  isAnnually: boolean;
}
const ReviewOrder = ({
  currentMembership,
  handleSubscribe,
  isAnnually,
}: ReviewOrderProps): JSX.Element => {
  return (
    <Paper p='md'>
      <Stack spacing='md'>
        <Title order={3} align='center'>
          Review
        </Title>
        <Badge size='md' mx='auto' mb='md'>
          Pay anually and save 20%
        </Badge>
        <Group position='apart'>
          <Text>Plan</Text>
          <Text>{currentMembership ? currentMembership.name : '-'}</Text>
        </Group>
        <Divider />
        <Group position='apart'>
          <Text>Price</Text>
          <Text>
            {currentMembership
              ? (isAnnually ? currentMembership.yearlyPrice : currentMembership.monthlyPrice) + '$'
              : '-'}
          </Text>
        </Group>
        <Divider />
        <Group position='apart'>
          <Text fw={600} size='lg'>
            Total
          </Text>
          <Text fw={600} size='lg'>
            {currentMembership
              ? isAnnually
                ? `${currentMembership.yearlyPrice}$ Yearly`
                : `${currentMembership.monthlyPrice}$ Monthly`
              : '-'}
          </Text>
        </Group>
        <Button variant='primary' size='md' mt='lg' onClick={handleSubscribe}>
          Confirm Changes
        </Button>
      </Stack>
    </Paper>
  );
};

export default ReviewOrder;

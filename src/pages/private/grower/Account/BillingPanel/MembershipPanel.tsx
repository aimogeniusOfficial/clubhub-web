import { ReactElement } from 'react';

import { Badge, Button, Container, Divider, Flex, Group, Text, Title } from '@mantine/core';
import { useAuth } from 'contexts/AuthContext';
import useProfile from 'hooks/auth/useProfile';
import useStripePortal from 'hooks/membership/useStripePortal';
import { showErrorNotification } from 'utils/notifications';

import SubscriptionBillingDateRangeDisplay from './Membership/components/SubscriptionBillingDateRangeDisplay';
import SubscriptionPlanLimitDisplay from './Membership/components/SubscriptionPlanLimitDisplay';
import SubscriptionPlanSelection from './Membership/SubscriptionPlanSelection';

const MembershipPanel = (): ReactElement => {
  const createUserPortal = useStripePortal();
  const { user } = useAuth();

  const FREE_PLAN_ID = '1';
  const { data: userProfile } = useProfile();

  const handleEditPaymentDetails = () => {
    createUserPortal.mutate(undefined, {
      onSuccess: (res: { data: { portalUrl: string } }) => {
        const checkoutUrl = res.data.portalUrl;

        if (checkoutUrl) {
          window.location.href = checkoutUrl;
        }
      },
      onError: (error: { message: string }) => {
        showErrorNotification('Failed to open portal', error.message);
      },
    });
  };
  return (
    <Container>
      <Title mt={24} order={3}>
        Plan details
      </Title>
      <Group position='apart'>
        <Flex mt={8}>
          <Flex direction='column'>
            <Flex gap='md' align='center' direction='row'>
              <Text sx={{ fontSize: '36px', fontWeight: 'bold' }}>
                {userProfile?.data.subscriptionPlanId === FREE_PLAN_ID ? `Free` : `Grower`}
              </Text>
              <Badge color='green' size='md'>
                Active
              </Badge>
            </Flex>
            {userProfile?.data.subscriptionPlanId === FREE_PLAN_ID ? (
              <Text size='sm'>You are currently on the free plan</Text>
            ) : (
              <Text size='sm'>
                You are on a paid plan{' '}
                <SubscriptionBillingDateRangeDisplay
                  startDateString={userProfile?.data.subscription?.activationDate}
                  endDateString={userProfile?.data.subscription?.expiryDate}
                />
              </Text>
            )}
          </Flex>
        </Flex>
        <Button size='xs' onClick={handleEditPaymentDetails}>
          Edit payment Details
        </Button>
      </Group>

      {userProfile && (
        <SubscriptionPlanLimitDisplay
          currentSubscriptionPlan={userProfile?.data.subscriptionPlan}
          subscriptionUsage={userProfile?.data.subscriptionUsage}
        />
      )}

      <Divider />

      {userProfile?.data.subscriptionPlanId === FREE_PLAN_ID && <SubscriptionPlanSelection />}
    </Container>
  );
};
export default MembershipPanel;

import React, { ReactElement, useState } from 'react';

import {
  Group,
  Switch,
  Title,
  Flex,
  Text,
  Badge,
  Card,
  Button,
  List,
  ThemeIcon,
} from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import useStripeCheckout from 'hooks/membership/useStripeCheckout';
import useSubscriptionPlan from 'hooks/membership/useSubscriptionPlan';
import { showErrorNotification } from 'utils/notifications';

const SubscriptionPlanSelection = (): ReactElement => {
  const [isBillAnnually, setIsBillAnnually] = useState(false);
  const { data: subscriptionPlansData } = useSubscriptionPlan();

  const checkout = useStripeCheckout();

  const handleSubscribe = async () => {
    if (subscriptionPlansData?.data?.length === undefined) {
      return;
    }

    const { stripeMonthlyPriceId, stripeYearlyPriceId } = subscriptionPlansData.data[1];

    if (!stripeMonthlyPriceId || !stripeYearlyPriceId) {
      showErrorNotification('Failed to create checkout', 'Membership is not selected');
    }

    const priceId = isBillAnnually ? stripeYearlyPriceId : stripeMonthlyPriceId;

    if (!priceId) {
      showErrorNotification('Failed to create checkout', 'Membership is not selected');
      return;
    }

    checkout.mutate(priceId, {
      onSuccess: (res: { json: () => Promise<{ session_url: string }> }) => {
        res.json().then((body: any) => {
          const checkoutUrl = body.session_url;

          if (checkoutUrl) {
            window.location.href = checkoutUrl;
          }
        });
      },
      onError: (error: { message: string }) => {
        showErrorNotification('Failed to create checkout', error.message);
      },
    });
  };

  return (
    <>
      <Title mt={24} order={3}>
        Explore our plans
      </Title>

      <Group mt={12} spacing={12}>
        <Text>Monthly</Text>
        <Switch
          size='md'
          onChange={event => setIsBillAnnually(event.currentTarget.checked)}
          checked={isBillAnnually}
        />
        <Text>Yearly</Text>
        <Badge size='md'>Pay anually and save 20%</Badge>
      </Group>

      <Card
        mt={24}
        sx={theme => ({
          width: '400px',
          [theme.fn.smallerThan('md')]: {
            width: '100%',
          },
        })}
        withBorder
        radius='lg'
      >
        <Flex direction='column' mt='md' mb='xs'>
          <Text size='lg' weight='bold'>
            Grower
          </Text>
          <Text size='sm'>For skilled grower</Text>
        </Flex>

        <Flex direction='column' mt='md' mb='xs'>
          <Text size='lg' weight='bold' color='green'>
            {isBillAnnually ? `$3.99/month` : `$4.99/month`}
          </Text>
          <Text size='sm'> {isBillAnnually ? `$47.90/month` : `$59.88/year`} </Text>
        </Flex>

        <Text size='sm' weight='bold'>
          A skilled grower who need to manage multiple grow rooms with different grow stages and
          tailored settings.
        </Text>
        <Text size='sm' mt={12} mb={24}>
          More features are coming soon!
        </Text>

        <List
          spacing='xs'
          size='sm'
          center
          icon={
            <ThemeIcon color='teal' size={24} radius='xl'>
              <IconCircleCheck size='1rem' />
            </ThemeIcon>
          }
        >
          <List.Item>Advanced Breeder & Cultivar Explorer</List.Item>
          <List.Item>4 Grow Rooms</List.Item>
          <List.Item>8 Active Grow Cycles</List.Item>
          <List.Item>64 Plants</List.Item>
          <List.Item>Early access to AI Shaman Assistant</List.Item>
        </List>

        <Button
          variant='light'
          color='blue'
          fullWidth
          mt='md'
          radius='md'
          onClick={handleSubscribe}
        >
          Upgrade
        </Button>
      </Card>
    </>
  );
};

export default SubscriptionPlanSelection;

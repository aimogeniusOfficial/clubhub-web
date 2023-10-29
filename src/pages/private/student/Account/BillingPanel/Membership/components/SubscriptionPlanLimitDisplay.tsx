import { ReactElement } from 'react';

import { Flex, Title } from '@mantine/core';
import { SubscriptionPlanRow } from 'types/generated';

import SubscriptionPlanLimitCard from './SubscriptionPlanLimitCard';

interface ISubscriptionPlanLimitDisplayProps {
  currentSubscriptionPlan: SubscriptionPlanRow;
  subscriptionUsage: {
    userGrowSpaceCount: number;
    userActiveGrowCycleCount: number;
    activePlantsCount: number;
  };
}

const SubscriptionPlanLimitDisplay = (props: ISubscriptionPlanLimitDisplayProps): ReactElement => {
  const { currentSubscriptionPlan, subscriptionUsage } = props;

  return (
    <>
      <Title mt={24} order={3}>
        Plan limit usage
      </Title>

      <Flex pt={24} pb={24} gap={24} wrap='wrap'>
        <SubscriptionPlanLimitCard
          feature='Grow Space'
          featureLimitDescription='Total grow spaces'
          limit={currentSubscriptionPlan.growSpaces}
          currentCount={subscriptionUsage.userGrowSpaceCount}
        />

        <SubscriptionPlanLimitCard
          feature='Grow Cycle'
          featureLimitDescription='Active grow cycles'
          limit={currentSubscriptionPlan.activeGrowCycles}
          currentCount={subscriptionUsage.userActiveGrowCycleCount}
        />

        <SubscriptionPlanLimitCard
          feature='Grow Cycle'
          featureLimitDescription='Plants per grow cycle'
          limit={currentSubscriptionPlan.plantsPerGrowCycle}
        />

        <SubscriptionPlanLimitCard
          feature='Plants'
          featureLimitDescription='Plants being grown'
          limit={
            currentSubscriptionPlan.plantsPerGrowCycle * currentSubscriptionPlan.activeGrowCycles
          }
          currentCount={subscriptionUsage.activePlantsCount}
        />
      </Flex>
    </>
  );
};

export default SubscriptionPlanLimitDisplay;

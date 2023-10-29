import { ReactElement } from 'react';

import { Badge, Flex, Paper, Text } from '@mantine/core';

interface ISubscriptionPlanLimitCardProps {
  feature: string;
  featureLimitDescription: string;
  limit: number;
  currentCount?: number;
}

const SubscriptionPlanLimitCard = (props: ISubscriptionPlanLimitCardProps): ReactElement => {
  const { feature, featureLimitDescription, limit, currentCount } = props;

  return (
    <Paper
      px='xl'
      radius='lg'
      bg='neutral.6'
      sx={theme => ({
        overflow: 'hidden',
        width: '200px',
        height: '130px',
        [theme.fn.smallerThan('md')]: {
          width: '100%',
        },
      })}
    >
      <Flex direction='column' py='md'>
        <Text size='xs' ff='Inter, sans-serif' color='neutral.3' lineClamp={1}>
          {featureLimitDescription}
        </Text>
        <Flex justify='space-between' align='center' wrap='nowrap'>
          <Text
            sx={{ fontSize: '36px', fontWeight: 'bold' }}
            ff='Inter, sans-serif'
            color='neutral.0'
          >
            {currentCount !== null && currentCount !== undefined
              ? `${currentCount} of ${limit}`
              : limit}
          </Text>
        </Flex>
        <Badge color='indigo' size='md'>
          {feature}
        </Badge>
      </Flex>
    </Paper>
  );
};

export default SubscriptionPlanLimitCard;

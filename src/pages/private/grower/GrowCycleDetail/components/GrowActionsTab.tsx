import React from 'react';

import { Button, Paper, Text, Timeline, useMantineTheme } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import EmptyState from 'components/states/EmptyState';
import dayjs from 'dayjs';
import { GrowActionRow, GrowCycleRow } from 'types/generated';

import { ACTION_ICON_MAP, ACTION_TITLE_MAP } from '../data/growActionSelectOptions';
import useGrowActions from '../hooks/useGrowActions';

const GrowActionsTab = ({
  growCycle,
  openAction,
}: {
  growCycle: GrowCycleRow;
  openAction: () => void;
}): JSX.Element => {
  const theme = useMantineTheme();
  const { data } = useGrowActions(growCycle.id || '');

  return (
    <>
      {data?.data.length === 0 && (
        <EmptyState
          mt='xl'
          title='No actions'
          description='You haven’t done any actions to this Grow Cycle yet'
          Icon={
            <Button mt='md' leftIcon={<IconPlus size={theme.fontSizes.md} />} onClick={openAction}>
              Add an action
            </Button>
          }
        />
      )}

      {data?.data.length > 0 && (
        <Paper py='sm' radius='lg' px='lg'>
          <Timeline
            active={data?.data.length}
            bulletSize={14}
            color='green'
            lineWidth={2}
            p={theme.spacing.md}
          >
            {data?.data.map((action: GrowActionRow) => (
              <Timeline.Item
                key={action.id}
                title={action.type ? ACTION_TITLE_MAP[action.type] : 'No action type'}
                bullet={
                  action.type
                    ? React.createElement(ACTION_ICON_MAP[action.type], { size: 18 })
                    : null
                }
                bulletSize={24}
              >
                <Text color={theme.colorScheme === 'dark' ? 'white' : 'black'} size='sm'>
                  {action.note}
                </Text>
                <Text size='xs' mt={4}>
                  {dayjs(action.actionDate).format('MMMM D, YYYY')}
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </Paper>
      )}
    </>
  );
};

export default GrowActionsTab;

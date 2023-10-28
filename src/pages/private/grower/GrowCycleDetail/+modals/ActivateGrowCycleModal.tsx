import React, { ReactElement } from 'react';

import { Stack, Group, Text, Timeline, Button, Divider, Alert } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconAlertCircle, IconGitCommit } from '@tabler/icons-react';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

import useUpdateGrowCycleStatus from '../../GrowCycles/hooks/useUpdateGrowCycleStatus';

const ActivateGrowCycleModal = ({ growCycle }: { growCycle: any }): ReactElement => {
  const updateGrowCycleStatus = useUpdateGrowCycleStatus(growCycle.id);
  const closeModal = (): void => modals.closeAll();

  const handleActivate = (): void => {
    updateGrowCycleStatus.mutate(
      {
        status: 'ACTIVE',
      },
      {
        onSuccess: () => {
          showSuccessNotification('Grow cycle is activated.');
          modals.closeAll();
        },
        onError: error => {
          showErrorNotification('Failed to activate grow cycle', error.message);
        },
      },
    );
  };

  return (
    <Stack>
      <Alert icon={<IconAlertCircle size='1rem' />} title='Review Grow Cycle' color='green'>
        Are you satisfied with your grow cycle setup? Please review and click activate.
      </Alert>
      <Timeline active={4} bulletSize={24} lineWidth={2}>
        <Timeline.Item bullet={<IconGitCommit size={12} />} title='Starting Stage'>
          <Text color='dimmed' size='sm'>
            Indicate starting stage seed, clone, seedling, veg, flower
          </Text>
          <Text size='md' mt={4}>
            Current: {growCycle.startingGrowStage}
          </Text>
        </Timeline.Item>

        <Timeline.Item bullet={<IconGitCommit size={12} />} title='Number of plants'>
          <Text color='dimmed' size='sm'>
            The initial number of plants needs to be specified
          </Text>
          <Text size='md' mt={4}>
            Total: {growCycle.initialPlantCount}{' '}
            {growCycle.initialPlantCount > 1 ? 'PLANTS' : 'PLANT'}
          </Text>
        </Timeline.Item>

        <Timeline.Item title='Nutrients' bullet={<IconGitCommit size={12} />}>
          <Text color='dimmed' size='sm'>
            Specify feeding schedule - nutrients or soil
          </Text>
          <Text size='md' mt={4}>
            Medium: Soil
          </Text>
          <Text size='md' mt={4}>
            Feeding: Athena
          </Text>
        </Timeline.Item>

        <Timeline.Item title='Light Schedule' bullet={<IconGitCommit size={12} />}>
          <Text color='dimmed' size='sm'>
            Specify initial light schedule. You can always update it later
          </Text>
          <Text size='md' mt={4}>
            ON 18 hours
          </Text>
          <Text size='md' mt={4}>
            OFF 6 hours
          </Text>
        </Timeline.Item>
      </Timeline>
      <Divider />
      <Group position='right' mt={24}>
        <Button onClick={closeModal} type='button' variant='secondary'>
          Continue Setup
        </Button>
        <Button type='button' onClick={handleActivate}>
          Activate
        </Button>
      </Group>
    </Stack>
  );
};
export default ActivateGrowCycleModal;

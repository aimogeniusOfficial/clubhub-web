import React, { forwardRef, ReactElement, useEffect } from 'react';

import {
  Button,
  Drawer,
  DrawerProps,
  Group,
  Stack,
  TextInput,
  Text,
  Select,
  Textarea,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { uuid } from '@supabase/supabase-js/dist/main/lib/helpers';
import { IconBolt } from '@tabler/icons-react';
import { GrowCycleRow } from 'types/generated';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

import GrowActionType from '../+models/grow-action-type.enum';
import growActionSelectOptions from '../data/growActionSelectOptions';
import useCreateGrowAction from '../hooks/useCreateGrowAction';

interface FormValues {
  type: GrowActionType | null;
  isMeasurement?: boolean;
  value: string;
  note: string;
  actionDate: Date;
  growCycleId: string;
}

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  icon: ReactElement;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ icon, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Group>{icon}</Group>

        <div>
          <Text size='sm'>{label}</Text>
          <Text size='xs' opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  ),
);

interface GrowSpaceCreateDrawerProps extends DrawerProps {
  growCycle: GrowCycleRow;
}

const AddActionDrawer = ({
  opened,
  onClose,
  growCycle,
}: GrowSpaceCreateDrawerProps): JSX.Element => {
  const createGrowActionMutation = useCreateGrowAction();

  const form = useForm({
    initialValues: {
      type: null,
      isMeasurement: false,
      value: '',
      note: '',
      growCycleId: growCycle.id,
      actionDate: new Date(),
    },
  });

  const addGrowAction = (growActionData: FormValues): void => {
    createGrowActionMutation.mutate(
      { ...growActionData, id: uuid() },
      {
        onSuccess: () => {
          showSuccessNotification('Grow space created successfully', `Action added successfully`);

          onClose();
          form.reset();
        },
        onError: error => {
          showErrorNotification('Failed to create action', error.message);
        },
      },
    );
  };

  useEffect(() => {
    form.setFieldValue('growCycleId', growCycle.id);
  }, [growCycle]);

  useEffect(() => {
    const currentType = form.values.type;
    if (currentType) {
      const isMeasurementType = [
        GrowActionType.VPD,
        GrowActionType.TEMPERATURE,
        GrowActionType.LIGHT_INTENSITY,
        GrowActionType.HUMIDITY,
      ].includes(currentType);

      if (isMeasurementType !== form.values.isMeasurement) {
        form.setFieldValue('isMeasurement', isMeasurementType);
      }
    }
  }, [form]);

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      zIndex={999}
      size={500}
      padding='md'
      title={
        <Title order={3} color='neutral.0'>
          Add a new action
        </Title>
      }
      position='right'
    >
      <form onSubmit={form.onSubmit(addGrowAction)}>
        <Stack spacing='xs'>
          <Select
            label='Action type'
            placeholder='Pick one'
            itemComponent={SelectItem}
            data={growActionSelectOptions}
            icon={<IconBolt />}
            {...form.getInputProps('type')}
          />
          {form.values.isMeasurement && (
            <TextInput
              required
              label='Value'
              placeholder='Enter new value'
              {...form.getInputProps('value')}
            />
          )}
          <Textarea required label='Note' placeholder='Note' {...form.getInputProps('note')} />
          <DateInput label='Date' placeholder='Action Date' {...form.getInputProps('actionDate')} />
        </Stack>
        <Group position='right'>
          <Button type='submit' mt='xl' size='md'>
            Create
          </Button>
        </Group>
      </form>
    </Drawer>
  );
};

export default AddActionDrawer;

import { ReactElement } from 'react';

import { Select, SelectItem, SimpleGrid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import FormCard from 'components/cards/FormCard';
import useUpdateGrowCycle from 'pages/private/grower/GrowCycleDetail/hooks/useUpdateGrowCycle';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

const formId = 'grow-cycle-starting-stage-form-id';

const GrowCycleStageCard = ({ growCycle }: any): ReactElement => {
  const [isEdit, { open, close, toggle }] = useDisclosure(false);
  const updateMutation = useUpdateGrowCycle(growCycle.id);

  const form = useForm<any>({
    initialValues: {
      startingGrowStage: growCycle.startingGrowStage ?? null,
    },
  });

  const handleCancel = (): void => {
    close();
    form.setFieldValue('startingGrowStage', growCycle.startingGrowStage ?? null);
  };

  const handleSubmit = (formValues: any): void => {
    const payload = {
      ...formValues,
    };

    updateMutation.mutate(payload, {
      onSuccess: () => {
        showSuccessNotification(`Grow Cycle update success.`, `Starting grow stage is updated.`);
        toggle();
      },
      onError: error => showErrorNotification('Grow Cycle update failed.', error.message),
    });
  };

  const stages: SelectItem[] = [
    { value: 'SEED', label: 'Seed' },
    { value: 'SEEDLING', label: 'Seedling' },
    { value: 'CLONE', label: 'Clone' },
    { value: 'VEGETATIVE', label: 'Vegetative' },
    { value: 'FLOWER', label: 'Flowering' },
    { value: 'HARVEST', label: 'Harvest' },
  ];

  return (
    <FormCard
      title='Grow Cycle Starting Stage'
      formId={formId}
      isEdit={isEdit}
      onOpen={open}
      onClose={handleCancel}
      loading={updateMutation.isLoading}
      editable={growCycle.status === 'DRAFT'}
    >
      <form id={formId} onSubmit={form.onSubmit(handleSubmit)}>
        <SimpleGrid
          breakpoints={[
            {
              maxWidth: 'sm',
              cols: 1,
            },
            {
              minWidth: 'sm',
              cols: 2,
            },
          ]}
        >
          <Select
            label='Grow Stage'
            placeholder='Select Starting Stage'
            data={stages}
            readOnly={!isEdit}
            {...form.getInputProps('startingGrowStage')}
          />
        </SimpleGrid>
      </form>
    </FormCard>
  );
};
export default GrowCycleStageCard;

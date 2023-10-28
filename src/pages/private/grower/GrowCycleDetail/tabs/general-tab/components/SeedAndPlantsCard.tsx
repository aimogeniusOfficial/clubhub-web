import { SimpleGrid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import FormCard from 'components/cards/FormCard';
import QuantityInput from 'components/inputs/QuantityInput';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

import useUpdateGrowCycle from '../../../hooks/useUpdateGrowCycle';

interface GrowCycleSeedsAndPlantsCardProps {
  growCycle: any;
  isFetching: boolean;
}

const formId = 'plants-and-seeds-form-id';

const GrowCycleSeedsAndPlantsCard = ({
  growCycle,
  isFetching,
}: GrowCycleSeedsAndPlantsCardProps): JSX.Element => {
  const [isEdit, { close, open }] = useDisclosure(false);
  const updateMutation = useUpdateGrowCycle(growCycle?.id);

  const form = useForm<any>({
    initialValues: {
      initialPlantCount: growCycle.initialPlantCount ?? 1,
    },
  });

  const handleCancel = (): void => {
    form.setFieldValue('initialPlantCount', growCycle.initialPlantCount ?? 1);
    close();
  };

  const handleSubmit = (formValues: any): void => {
    const payload = {
      ...formValues,
    };

    updateMutation.mutate(payload, {
      onSuccess: () => {
        showSuccessNotification(`Grow Cycle update success.`, `Starting plant count is updated.`);
        close();
      },
      onError: error => showErrorNotification('Grow Cycle update failed.', error.message),
    });
  };

  const label = growCycle.startingGrowStage === 'SEED' ? 'Seeds' : 'Plants';

  return (
    <FormCard
      title='Plants and Seeds'
      formId={formId}
      isEdit={isEdit}
      onOpen={open}
      onClose={handleCancel}
      loading={updateMutation.isLoading}
      editable={!isFetching || growCycle.status === 'DRAFT'}
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
            {
              minWidth: 'md',
              cols: 3,
            },
          ]}
        >
          <QuantityInput
            label={`Select Number of ${label}`}
            formProps={form.getInputProps('initialPlantCount')}
            readOnly={!isEdit}
          />
        </SimpleGrid>
      </form>
    </FormCard>
  );
};
export default GrowCycleSeedsAndPlantsCard;

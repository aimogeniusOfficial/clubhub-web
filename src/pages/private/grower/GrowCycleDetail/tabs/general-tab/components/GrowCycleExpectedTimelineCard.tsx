import { SimpleGrid } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import FormCard from 'components/cards/FormCard';

import useExpectedGrowCycleTimelineForm from '../../../+form/useExpectedGrowCycleTimelineForm';

const formId = 'grow-cycle-expected-timeline-edit-id';

const GrowCycleExpectedTimelineCard = ({ growCycle }: any): JSX.Element => {
  const [isEdit, { open, toggle }] = useDisclosure(false);

  const { form, handleSubmit, handleCancel, loading } = useExpectedGrowCycleTimelineForm(
    growCycle,
    toggle,
  );

  return (
    <FormCard
      title='Expected Timeline'
      formId={formId}
      isEdit={isEdit}
      onOpen={open}
      onClose={handleCancel}
      loading={loading}
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
          <DateInput
            label='Expected Flowering Start Date'
            placeholder='Set Expected Date'
            readOnly={!isEdit}
            maxDate={form.values.expectedHarvestDate}
            {...form.getInputProps('expectedFlowerStartDate')}
          />
          <DateInput
            label='Expected Harvest Date'
            placeholder='Set Expected Date'
            readOnly={!isEdit}
            minDate={form.values.expectedFlowerStartDate}
            {...form.getInputProps('expectedHarvestDate')}
          />
        </SimpleGrid>
      </form>
    </FormCard>
  );
};
export default GrowCycleExpectedTimelineCard;

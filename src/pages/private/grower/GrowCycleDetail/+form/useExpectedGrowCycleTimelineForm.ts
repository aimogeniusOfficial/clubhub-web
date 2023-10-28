import { useForm, UseFormReturnType } from '@mantine/form';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

import useUpdateGrowCycle from '../hooks/useUpdateGrowCycle';

interface FormValues {
  expectedFlowerStartDate: Date | null;
  expectedHarvestDate: Date | null;
}

const useExpectedGrowCycleTimelineForm = (
  growCycle: any,
  toggleEditing: any,
): {
  form: UseFormReturnType<any, (values: any) => any>;
  handleSubmit: (values: any) => void;
  handleCancel: () => void;
  loading: boolean;
} => {
  const updateMutation = useUpdateGrowCycle(growCycle.id);

  const form = useForm<FormValues>({
    initialValues: {
      expectedFlowerStartDate: growCycle.expectedFlowerStartDate
        ? new Date(growCycle.expectedFlowerStartDate)
        : null,
      expectedHarvestDate: growCycle.expectedHarvestDate
        ? new Date(growCycle.expectedHarvestDate)
        : null,
    },
  });

  const handleSubmit = (formValues: any): void => {
    const payload = {
      ...formValues,
    };

    updateMutation.mutate(payload, {
      onSuccess: () => {
        showSuccessNotification(`Grow Cycle update success.`, `Timeline is updated.`);
        toggleEditing();
      },
      onError: error => showErrorNotification('Grow Cycle update failed.', error.message),
    });
  };

  const handleCancel = (): void => {
    form.setFieldValue(
      'expectedFlowerStartDate',
      growCycle.expectedFlowerStartDate ? new Date(growCycle.expectedFlowerStartDate) : null,
    );
    form.setFieldValue(
      'expectedHarvestDate',
      growCycle.expectedHarvestDate ? new Date(growCycle.expectedHarvestDate) : null,
    );
    toggleEditing();
  };

  return { form, handleSubmit, handleCancel, loading: updateMutation.isLoading };
};

export default useExpectedGrowCycleTimelineForm;

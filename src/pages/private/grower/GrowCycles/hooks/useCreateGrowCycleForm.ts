import { useForm } from '@mantine/form';
import { GrowCycleForm } from '../+models/grow-cycle-form';
import useCreateGrowCycle from './useCreateGrowCycle';
import { showErrorNotification, showSuccessNotification } from '../../../../../utils/notifications';
import { useNavigate } from 'react-router-dom';

const useCreateGrowCycleForm = (onClose: any): any => {
  const createMutation = useCreateGrowCycle();
  const navigate = useNavigate();

  const form = useForm<GrowCycleForm>({
    initialValues: {
      name: '',
      description: '',
      growSpaceId: '',
      cultivarId: null,
      breederCultivarId: null,
    },
    validate: {
      name: value =>
        value.length > 32 || value.length < 4 ? 'Name should have from 4 to 32 characters' : null,
    },
  });

  const handleSubmit = (formValues: any): void => {
    const payload = {
      ...formValues,
      description: formValues.description.length === 0 ? null : formValues.description,
    };

    createMutation.mutate(payload, {
      onSuccess: () => {
        showSuccessNotification(
          `Grow Cycle creation success.`,
          `${formValues.name} has been added.`,
        );
        form.reset();
        onClose();
      },
      onError: error => showErrorNotification('Grow Cycle creation failed.', error.message),
      onSettled: async (response: any) => {
        const data = await response.json();
        navigate(`/grow-cycle/${data.id}`);
      },
    });
  };

  return { form, handleSubmit };
};

export default useCreateGrowCycleForm;

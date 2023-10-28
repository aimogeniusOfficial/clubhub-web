import { ReactElement, useEffect } from 'react';

import { SimpleGrid, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import FormCard from 'components/cards/FormCard';
import useUpdateProfile from 'hooks/auth/useUpdateProfile';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

interface FormValues {
  name: string;
  username: string;
}

const AccountPanel = ({ profile }: { profile: any }): ReactElement => {
  const updateProfile = useUpdateProfile();

  const initialValues = {
    name: profile.name || '',
    username: profile.username || '',
  };
  const form = useForm<FormValues>({
    initialValues,
  });

  const [isEdit, { open, close }] = useDisclosure(false);

  const readonlyFields = !isEdit || updateProfile.isLoading;

  const handleCloseAndReset = (): void => {
    close();
    form.setValues(initialValues);
  };

  const handleSubmit = (formValues: FormValues): void => {
    updateProfile.mutate(formValues, {
      onSuccess: () => {
        showSuccessNotification('Profile update success');
        close();
      },
      onError: error => {
        showErrorNotification('Profile update failed', error?.response?.data.message);
      },
    });
  };

  return (
    <SimpleGrid
      mt='xl'
      breakpoints={[
        {
          maxWidth: 'md',
          cols: 1,
        },
        {
          minWidth: 'md',
          cols: 2,
        },
      ]}
    >
      <FormCard
        title='Profile'
        formId='profile-settings'
        isEdit={isEdit}
        onOpen={open}
        onClose={handleCloseAndReset}
        loading={updateProfile.isLoading}
      >
        <form id='profile-settings' onSubmit={form.onSubmit(handleSubmit)}>
          <SimpleGrid cols={2} verticalSpacing='xs'>
            <TextInput
              label='Name'
              placeholder='New Name'
              readOnly={readonlyFields}
              {...form.getInputProps('name')}
            />
            <TextInput
              label='Username'
              placeholder='New Username'
              readOnly={readonlyFields}
              {...form.getInputProps('username')}
            />
            <TextInput label='Readonly Email' readOnly value={profile.email} />
          </SimpleGrid>
        </form>
      </FormCard>
    </SimpleGrid>
  );
};

export default AccountPanel;

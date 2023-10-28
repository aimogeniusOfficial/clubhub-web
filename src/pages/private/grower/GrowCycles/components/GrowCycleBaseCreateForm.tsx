import { Button, Group, Stack, Switch, Textarea, TextInput } from '@mantine/core';
import GrowSpaceSelectField from '../+form/create-base-grow-cycle-fields/GrowSpaceSelects';
import CultivarSelect from '../../../../../components/auto-complete/CultivarSelect';
import React, { ReactElement, useState } from 'react';
import useCreateGrowCycleForm from '../hooks/useCreateGrowCycleForm';
import BreederCultivarSelect from '../../../../../components/auto-complete/BreederCultivarSelect';

const GrowCycleBaseCreateForm = ({ onClose }: any): ReactElement => {
  const [isBreederCultivar, setIsBreederCultivar] = useState(false);
  const { form, handleSubmit } = useCreateGrowCycleForm(onClose);

  const handleCloseAndReset = (): void => {
    form.reset();
    onClose();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          required
          label='Name'
          placeholder='Enter new grow cycle name'
          {...form.getInputProps('name')}
        />
        <Textarea
          required
          label='Description'
          placeholder='Enter description'
          {...form.getInputProps('description')}
        />
        <GrowSpaceSelectField
          size='xs'
          placeholder='Grow Space'
          required
          {...form.getInputProps('growSpaceId')}
        />
        <Switch
          label='I have verified breeder cultivar'
          mt={12}
          mb={12}
          checked={isBreederCultivar}
          onChange={event => setIsBreederCultivar(event.currentTarget.checked)}
        />
        {isBreederCultivar ? (
          <BreederCultivarSelect
            size='xs'
            placeholder='Verified Breeder Cultivar'
            required
            {...form.getInputProps('breederCultivarId')}
          />
        ) : (
          <CultivarSelect
            size='xs'
            placeholder='Cultivar'
            required
            {...form.getInputProps('cultivarId')}
          />
        )}
        <Group position='right' mt='md'>
          <Button variant='ghostFilled' onClick={handleCloseAndReset}>
            Cancel
          </Button>
          <Button type='submit'>Create</Button>
        </Group>
      </Stack>
    </form>
  );
};
export default GrowCycleBaseCreateForm;

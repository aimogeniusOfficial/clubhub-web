import React, { useState } from 'react';

import { Button, Group, Modal, Paper, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure, useShallowEffect } from '@mantine/hooks';
import Table from 'components/Table';
import { useAuth } from 'contexts/AuthContext';
import dayjs from 'dayjs';
import useCreateUserInvite from 'hooks/admin/user-invitations/useCreateUserInvite';
import usePaginatedUserInvitations from 'hooks/admin/user-invitations/usePaginatedUserInvitations';
import { UserInvitationInsert, UserInvitationRow } from 'types/generated';
import { generateInviteCode } from 'utils/functions';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

const UserInvite = (): JSX.Element => {
  const { user } = useAuth();

  const [tableData, setTableData] = useState<UserInvitationRow[]>([]);
  const [isModalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const { data, isLoading } = usePaginatedUserInvitations();

  useShallowEffect(() => {
    if (!isLoading && data?.data) {
      setTableData(data.data);
    }
  });

  const form = useForm<UserInvitationInsert>({
    initialValues: {
      inviteeEmail: '' as string,
      inviterId: user.id,
      token: generateInviteCode(),
    },
    validate: {
      inviteeEmail: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    },
  });

  const columns = [
    {
      Header: 'Email',
      accessor: 'inviteeEmail',
    },
    {
      Header: 'Token',
      accessor: 'token',
    },
    {
      Header: 'Invited At',
      accessor: 'createdAt',
      Cell: ({ value }: { value: string }) => <>{dayjs(value).format('MMMM D, YYYY h:mm A')}</>,
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
  ];

  const createUserInviteMutation = useCreateUserInvite();

  const handleSubmit = (formValues: UserInvitationInsert): void => {
    createUserInviteMutation.mutate(formValues, {
      onSuccess: () => {
        showSuccessNotification('User invited successfully', 'User invited successfully');
        form.reset();
      },
      onError: error => {
        showErrorNotification('Failed to invite user', error.message);
      },
      onSettled: () => {
        closeModal();
      },
    });
  };

  // @ts-ignore
  return (
    <>
      <Paper radius='lg' p='xl' shadow='sm'>
        <Group position='apart' mb='md'>
          <Title order={4}>Users</Title>
          <Button onClick={openModal}>Invite User</Button>
        </Group>
        <Table data={tableData} columns={columns} />
      </Paper>
      <Modal
        size='lg'
        zIndex={9999}
        opened={isModalOpened}
        onClose={closeModal}
        title={<Text weight={500}>Create Invitation</Text>}
        centered
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack spacing='xs'>
            <TextInput
              required
              label='User`s email'
              placeholder='your@mail.com'
              {...form.getInputProps('inviteeEmail')}
            />

            <Group position='right' mt='sm'>
              <Button onClick={closeModal} variant='outline'>
                Cancel
              </Button>
              <Button type='submit'>Submit</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default UserInvite;

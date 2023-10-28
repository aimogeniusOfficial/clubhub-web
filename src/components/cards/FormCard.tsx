import React from 'react';

import { Button, Divider, Group, Paper, Stack, Title } from '@mantine/core';

interface FormCardProps {
  formId: string;
  title: string;
  isEdit: boolean;
  onClose: () => void;
  onOpen: () => void;
  children: React.ReactNode;
  loading: boolean;
  editable?: boolean;
}

const FormCard = ({
  formId,
  title,
  isEdit,
  onClose,
  onOpen,
  children,
  loading,
  editable = true,
}: FormCardProps): JSX.Element => {
  const showEditButton = !isEdit && !loading;

  return (
    <Paper p='md' radius='lg' h='fit-content'>
      <Stack spacing='xs'>
        <Group position='apart' spacing='xs' noWrap>
          <Title order={4} color='neutral.2'>
            {title}
          </Title>

          {editable && (
            <>
              {showEditButton ? (
                <Button size='xs' onClick={onOpen}>
                  Edit
                </Button>
              ) : (
                <Group spacing='xs'>
                  <Button size='xs' type='submit' loading={loading} form={formId}>
                    Save
                  </Button>
                  <Button size='xs' variant='ghostFilled' disabled={loading} onClick={onClose}>
                    Cancel
                  </Button>
                </Group>
              )}
            </>
          )}
        </Group>

        <Divider />

        {children}
      </Stack>
    </Paper>
  );
};

export default FormCard;

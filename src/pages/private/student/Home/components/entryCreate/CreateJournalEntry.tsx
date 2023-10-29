import React from 'react';

import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMoodSmile } from '@tabler/icons-react';
import { useAuth } from 'contexts/AuthContext';

import CreateJournalEntryModal from './CreateJournalEntryModal';

const CreateJournalEntry = ({ growCycleId }: { growCycleId?: string }): JSX.Element => {
  const [opened, { open, close }] = useDisclosure(false);
  const { user } = useAuth();

  return (
    <>
      <UnstyledButton
        py='xs'
        px='xl'
        sx={theme => ({
          border: `2px solid ${theme.colors.neutral[4]}`,
          borderRadius: theme.radius.lg,
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: theme.fn.rgba(theme.colors.neutral[6], 0.5),
          },
          padding: theme.spacing.xl,

          [theme.fn.smallerThan('md')]: {
            padding: theme.spacing.xs,
          },
        })}
        onClick={open}
      >
        <Group position='apart' noWrap>
          <Group noWrap>
            <Avatar radius='xl' size='md' />
            <Text size='md'>What&apos;s happening in your club life?</Text>
          </Group>
          <IconMoodSmile />
        </Group>
      </UnstyledButton>
      <CreateJournalEntryModal
        growCycleId={growCycleId}
        opened={opened}
        onClose={close}
        user={user}
        isCreation
      />
    </>
  );
};

export default CreateJournalEntry;

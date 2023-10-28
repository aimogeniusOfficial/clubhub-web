import React, { useEffect, useRef, useState } from 'react';

import { Avatar, Button, Group, Modal, ModalProps, Stack, Text, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { User } from '@supabase/supabase-js';
import GrowCycleSelect from 'components/auto-complete/GrowCycleSelect';
import useCreateJournalEntry from 'hooks/journal_entry/useCreateJournalEntry';
import useUpdateJournalEntry from 'hooks/journal_entry/useUpdateJournalEntry';
import useUploadEntryFile from 'hooks/journal_entry/useUploadEntryFile';
import { EntryActionTypes } from 'types/enums/entry-action-types';
import { JournalEntryInsert, JournalEntryWithAttachments } from 'types/generated';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

import AddEntryButton from './AddEntryButton';
import AddEntryModal from './AddEntryModal';
import FileEntry from './FileEntry';

interface CreateJournalEntryModalProps extends ModalProps {
  growCycleId?: string;
  user: User;
  isCreation: boolean;
  journalEntry?: JournalEntryWithAttachments;
}

const CreateJournalEntryModal = ({
  growCycleId,
  opened,
  onClose,
  user,
  isCreation,
  journalEntry,
}: CreateJournalEntryModalProps): JSX.Element => {
  const updateJournalMutation = useUpdateJournalEntry();

  const [isSubModalOpen, setSubModalOpen] = useState(false);
  const [isMainModalOpen, setMainModalOpen] = useState(opened);
  const [isDropzoneOpen, setDropzoneOpen] = useState(false);

  const openRef = useRef<() => void>(null);
  const [mediaFiles, setMediaFiles] = React.useState<{ file: File; objectUrl: string }[]>([]);
  const createJournalEntryMutation = useCreateJournalEntry();
  const uploadFilesMutation = useUploadEntryFile();

  const handleDrop = (files: File[]): void => {
    const fileWithUrls = files.map(file => ({
      file,
      objectUrl: URL.createObjectURL(file),
    }));
    setMediaFiles(prevFiles => [...prevFiles, ...fileWithUrls]);
  };

  const form = useForm({
    initialValues: {
      growCycleId: growCycleId || journalEntry?.growCycleId || '',
      entryText: journalEntry?.entryText || '',
    },
  });

  const closeDropzone = (): void => {
    setDropzoneOpen(false);
    setMediaFiles([]);
  };

  const toggleModals = (): void => {
    setMainModalOpen(!isMainModalOpen);
    setSubModalOpen(!isSubModalOpen);
  };

  const closeMainModal = (): void => {
    setMainModalOpen(false);
    setMediaFiles([]);
    closeDropzone();
    form.reset();
    onClose();
  };

  const handleActionClick = (action: EntryActionTypes): void => {
    switch (action) {
      case EntryActionTypes.Photo:
        setDropzoneOpen(true);
        break;
      case EntryActionTypes.Friend:
        break;
      case EntryActionTypes.Location:
        break;
      case EntryActionTypes.Feeling:
        break;
      default:
        break;
    }
  };

  const uploadFiles = async (journalEntryId: number): Promise<void> => {
    if (!mediaFiles) {
      showErrorNotification('Please attach a media file', 'No media file attached');
      return;
    }

    uploadFilesMutation.mutate({
      journalEntryId,
      files: mediaFiles.map(mediaFile => mediaFile.file),
      userId: user?.id,
    });
  };

  const addJournalEntry = async (values: {
    growCycleId: string;
    entryText: string;
  }): Promise<void> => {
    const journalEntryData: JournalEntryInsert = {
      growCycleId: values.growCycleId || null,
      entryText: values.entryText,
      createdBy: user?.id,
    };

    if (!isCreation && journalEntryData) {
      const journalEntryUpdated = {
        ...journalEntryData,
        id: Number(journalEntry?.id),
      };

      updateJournalMutation.mutate(journalEntryUpdated, {
        onSuccess: () => {
          if (journalEntry?.id) {
            if (isDropzoneOpen) {
              uploadFiles(journalEntry.id);
            }

            showSuccessNotification('Journal Entry updated successfully');
            closeMainModal();
          }
        },
        onError: error => {
          showErrorNotification('Failed to insert Journal Entry', error.message);
        },
        onSettled: () => {
          onClose();
        },
      });
    } else {
      createJournalEntryMutation.mutate(journalEntryData, {
        onSuccess: (res: any) => {
          const journalEntryId = res?.data?.id;

          if (isDropzoneOpen) {
            uploadFiles(journalEntryId);
          }

          showSuccessNotification('Journal Entry', 'Created successfully');

          closeMainModal();
        },
        onError: error => {
          showErrorNotification('Failed to create journal entry', error.message);
        },
      });
    }
  };

  useEffect(() => {
    setMainModalOpen(opened);
  }, [opened]);

  useEffect(() => {
    if (!isCreation) {
      form.setValues({
        growCycleId: journalEntry?.growCycleId ?? '',
        entryText: journalEntry?.entryText ?? '',
      });
      if (journalEntry?.attachments) {
        setDropzoneOpen(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [journalEntry, isCreation]);

  useEffect(() => {
    return () => {
      mediaFiles.forEach(file => URL.revokeObjectURL(file.objectUrl));
    };
  }, [mediaFiles]);

  return (
    <>
      <Modal
        size='lg'
        zIndex={9999}
        opened={isMainModalOpen}
        onClose={closeMainModal}
        title={
          <Text weight={500}>{isCreation ? 'Create Journal Entry' : 'Edit Journal Entry'}</Text>
        }
        centered
      >
        <form onSubmit={form.onSubmit(addJournalEntry)}>
          <Stack spacing='xs'>
            <Group>
              <Avatar radius='xl' size='md' />
              <div>
                <Text mb={5} size='xs'>
                  {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
                </Text>
                <GrowCycleSelect
                  userId={user.id}
                  size='xs'
                  placeholder='Grow Cycle'
                  required
                  {...form.getInputProps('growCycleId')}
                />
              </div>
            </Group>

            <Textarea
              mt='xs'
              size='lg'
              placeholder="What's in your garden, Grower?"
              variant='unstyled'
              withAsterisk
              minRows={5}
              required
              {...form.getInputProps('entryText')}
            />
            {isDropzoneOpen && (
              <FileEntry
                closeDropzone={closeDropzone}
                files={mediaFiles}
                handleDrop={handleDrop}
                existingAttachments={isCreation ? undefined : journalEntry?.attachments}
                openRef={openRef}
              />
            )}
            <AddEntryButton onClick={toggleModals} />
            <Button type='submit' mt='md'>
              Post
            </Button>
          </Stack>
        </form>
      </Modal>
      <AddEntryModal
        opened={isSubModalOpen}
        onClose={toggleModals}
        onActionClick={handleActionClick}
      />
    </>
  );
};

export default CreateJournalEntryModal;

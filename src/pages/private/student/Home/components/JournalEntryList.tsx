import React from 'react';

import { Center, Loader, Stack, Text, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import LoadingOverlay from 'components/states/LoadingOverlay';
import { useAuth } from 'contexts/AuthContext';
import useDeleteJournalEntry from 'hooks/journal_entry/useDeleteJournalEntry';
import usePaginatedJournalEntry from 'hooks/journal_entry/usePaginatedJournalEntry';
import InfiniteScroll from 'react-infinite-scroll-component';
import { JournalEntryWithAttachments } from 'types/generated';
import { showSuccessNotification } from 'utils/notifications';

import CreateJournalEntryModal from './entryCreate/CreateJournalEntryModal';
import EntryDetailModal from './EntryDetailModal';
import GrowerEntryCard from './GrowerEntryCard';

interface GrowersTimelineProps {
  growSpaceId?: string;
  growCycleId?: string;
}

const JournalEntryList = ({ growSpaceId, growCycleId }: GrowersTimelineProps): JSX.Element => {
  const [entryActiveUrl, setEntryActiveUrl] = React.useState<string>('');
  const [activeJournal, setActiveJournal] = React.useState<JournalEntryWithAttachments & {}>();
  const { user } = useAuth();
  const theme = useMantineTheme();

  const [isDetailModalOpen, { open: openDetailModal, close: closeDetailModal }] =
    useDisclosure(false);
  const [isEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const deleteJournalEntry = useDeleteJournalEntry();

  const {
    data: journalEntries,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = usePaginatedJournalEntry(growSpaceId || '', growCycleId || '');

  const onEntryGalleryClick = (activeUrl: string): void => {
    setEntryActiveUrl(activeUrl);

    openDetailModal();
  };

  const onEditClick = (journalEntry: JournalEntryWithAttachments): void => {
    setActiveJournal(journalEntry);
    openEdit();
  };

  const handleDelete = (id: string): void => {
    modals.openConfirmModal({
      title: 'Delete Journal Entry',
      centered: true,
      children: <Text size='sm'>Are you sure you want to delete this Journal Entry?</Text>,
      labels: { cancel: "No don't delete it", confirm: 'Delete Entry' },
      confirmProps: { color: theme.colors.accent[0] },
      onConfirm: () => {
        deleteJournalEntry.mutate(id, {
          onSuccess: () => {
            showSuccessNotification('Journal Entry successfully deleted.');
          },
          onError: error => {
            showSuccessNotification('Failed to delete Journal Entry', error.message);
          },
        });
      },
    });
  };

  if (isLoading) {
    return <LoadingOverlay visible={isLoading} />;
  }

  return (
    <>
      {journalEntries?.pages && (
        <InfiniteScroll
          dataLength={journalEntries?.pages.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={
            <Center>
              <Loader />
            </Center>
          }
        >
          <Stack>
            {journalEntries?.pages.map(page =>
              page?.data?.map(journalEntry => (
                <GrowerEntryCard
                  key={journalEntry.id}
                  entry={journalEntry}
                  onClick={onEntryGalleryClick}
                  onEdit={onEditClick}
                  onDelete={handleDelete}
                />
              )),
            )}
          </Stack>
        </InfiniteScroll>
      )}
      <EntryDetailModal
        activeUrl={entryActiveUrl}
        opened={isDetailModalOpen}
        onClose={closeDetailModal}
      />
      <CreateJournalEntryModal
        user={user}
        isCreation={false}
        opened={isEdit}
        onClose={closeEdit}
        journalEntry={activeJournal}
      />
    </>
  );
};

export default JournalEntryList;

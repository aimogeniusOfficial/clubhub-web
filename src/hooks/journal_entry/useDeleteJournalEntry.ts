import { PostgrestError } from '@supabase/supabase-js';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import useSupabase from 'hooks/useSupabase';

export default function useDeleteJournalEntry(): UseMutationResult<unknown, PostgrestError, string> {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const deleteJournalEntry = (journalEntryId: string): any => {
    return client.from('JournalEntry').delete().eq('id', journalEntryId).throwOnError();
  };

  return useMutation(deleteJournalEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['JournalEntry'] });
    },
  });
}

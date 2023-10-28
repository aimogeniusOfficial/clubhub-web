import { PostgrestError } from '@supabase/supabase-js';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import useSupabase from 'hooks/useSupabase';
import { JournalEntryInsert } from 'types/generated';

export default function useCreateJournalEntry(): UseMutationResult<
  unknown,
  PostgrestError,
  JournalEntryInsert
> {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const createJournalEntry = (data: JournalEntryInsert): any => {
    return client.from('JournalEntry').upsert([data]).select().single().throwOnError();
  };

  return useMutation(createJournalEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['JournalEntry'] });
    },
  });
}

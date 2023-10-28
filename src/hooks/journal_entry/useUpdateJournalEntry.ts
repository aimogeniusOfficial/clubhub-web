import { PostgrestError } from '@supabase/supabase-js';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';
import { JournalEntryInsert } from 'types/generated';
import { BACKEND_URL } from 'utils/consts';

export default function useUpdateJournalEntry(): UseMutationResult<
  unknown,
  PostgrestError,
  JournalEntryInsert,
  void
> {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const updateJournalEntry = async (data: JournalEntryInsert): Promise<any> => {
    const response = await fetch(`${BACKEND_URL}/journal/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || 'Unknown error occurred.');
    }

    return response;
  };

  return useMutation(updateJournalEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['JournalEntry'] });
    },
  });
}

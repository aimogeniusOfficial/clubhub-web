import { PostgrestError } from '@supabase/supabase-js';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';
import { BACKEND_URL } from 'utils/consts';

interface LikeJournalEntryInput {
  journalEntryId: number;
}

export default function useLikeJournalEntry(): UseMutationResult<
  unknown,
  PostgrestError,
  LikeJournalEntryInput,
  void
> {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const likeJournalEntry = async (data: LikeJournalEntryInput): Promise<any> => {
    const response = await fetch(`${BACKEND_URL}/journal/like/${data.journalEntryId}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || 'Unknown error occurred.');
    }

    return response;
  };

  return useMutation(likeJournalEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`JournalEntry`] });
    },
  });
}

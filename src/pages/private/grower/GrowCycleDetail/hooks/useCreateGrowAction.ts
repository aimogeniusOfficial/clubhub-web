import { PostgrestError } from '@supabase/supabase-js';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';
import { GrowActionInsert } from 'types/generated';
import { BACKEND_URL } from 'utils/consts';

export default function useCreateGrowAction(): UseMutationResult<unknown, PostgrestError, any> {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const createGrowAction = async (data: GrowActionInsert): Promise<any> => {
    const response = await fetch(`${BACKEND_URL}/grow-cycles/action/${data.growCycleId}`, {
      method: 'POST',
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

  return useMutation(createGrowAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GrowAction'] });
    },
  });
}

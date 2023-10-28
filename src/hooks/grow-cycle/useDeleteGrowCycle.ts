import { PostgrestError } from '@supabase/supabase-js';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import useSupabase from 'hooks/useSupabase';

export default function useDeleteGrowCycle(): UseMutationResult<unknown, PostgrestError, string> {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const deleteGrowSpace = (growCycleId: string): any => {
    return client.from('GrowCycle').delete().eq('id', growCycleId).throwOnError();
  };

  return useMutation(deleteGrowSpace, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['growCycles'] });
    },
  });
}

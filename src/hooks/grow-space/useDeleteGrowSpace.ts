import { PostgrestError } from '@supabase/supabase-js';
import useSupabase from 'hooks/useSupabase';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

export default function useDeleteGrowSpace(): UseMutationResult<unknown, PostgrestError, string> {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const deleteGrowSpace = (growSpaceId: string): any => {
    return client.from('GrowSpace').delete().eq('id', growSpaceId).throwOnError();
  };

  return useMutation(deleteGrowSpace, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['growSpace'] });
      queryClient.invalidateQueries({ queryKey: ['growSpaceDetail'] });
    },
  });
}

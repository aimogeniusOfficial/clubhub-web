import { PostgrestError } from '@supabase/supabase-js';
import useSupabase from 'hooks/useSupabase';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

function useDeletePlant(): UseMutationResult<unknown, PostgrestError, string> {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const deletePlant = (plantId: string): any => {
    return client.from('plants').delete().eq('id', plantId).throwOnError();
  };

  return useMutation(deletePlant, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plants'] });
    },
  });
}

export default useDeletePlant;

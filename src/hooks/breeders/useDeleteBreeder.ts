import { PostgrestError } from '@supabase/supabase-js';
import useSupabase from 'hooks/useSupabase';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

function useDeleteBreeder(): UseMutationResult<unknown, PostgrestError, string> {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const deleteBreeder = (breederId: string): any => {
    return client.from('Breeder').delete().eq('id', breederId).throwOnError();
  };

  return useMutation(deleteBreeder, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Breeder'] });
    },
  });
}

export default useDeleteBreeder;

import { PostgrestError } from '@supabase/supabase-js';
import useSupabase from 'hooks/useSupabase';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

function useDeleteCultivar(): UseMutationResult<unknown, PostgrestError, string> {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const deleteCultivar = (cultivarId: string): any => {
    return client.from('Cultivar').delete().eq('id', cultivarId).throwOnError();
  };

  return useMutation(deleteCultivar, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Cultivar'] });
    },
  });
}

export default useDeleteCultivar;

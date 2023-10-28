import { PostgrestResponseFailure } from '@supabase/postgrest-js/src/types';
import useSupabase from 'hooks/useSupabase';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { BreederInsert, BreederRow } from '../../types/generated';

function useUpdateBreeder(): UseMutationResult<
  BreederRow,
  PostgrestResponseFailure['error'],
  BreederInsert
> {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const updateBreeder = (data: BreederInsert): any => {
    return client
      .from('Breeder')
      .update({
        name: data.name,
        country: data.country,
        state: data.state,
        website: data.website,
      })
      .eq('id', data.id)
      .throwOnError();
  };

  return useMutation(updateBreeder, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Breeder'] });
    },
  });
}

export default useUpdateBreeder;

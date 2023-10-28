import { PostgrestResponseFailure } from '@supabase/postgrest-js/src/types';
import useSupabase from 'hooks/useSupabase';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { GrowSpaceInsert, GrowSpaceRow } from 'types/generated';

export default function useUpdateGrowSpace(): UseMutationResult<
  GrowSpaceRow,
  PostgrestResponseFailure['error'],
  GrowSpaceInsert
> {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const updateGrowSpace = (data: GrowSpaceInsert): any => {
    return client
      .from('GrowSpace')
      .update({
        name: data.name,
        location: data.location,
      })
      .eq('id', data.id)
      .throwOnError();
  };

  return useMutation(updateGrowSpace, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['growSpace'] });
      queryClient.invalidateQueries({ queryKey: ['growSpaceDetail'] });
    },
  });
}

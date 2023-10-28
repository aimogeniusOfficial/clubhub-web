import { PostgrestResponseFailure } from '@supabase/postgrest-js/src/types';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import useSupabase from 'hooks/useSupabase';
import { GrowCycleInsert, GrowCycleRow } from 'types/generated';

export default function useUpdateGrowCycle(): UseMutationResult<
  GrowCycleRow,
  PostgrestResponseFailure['error'],
  GrowCycleInsert
> {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const updateFeature = (data: GrowCycleInsert): any => {
    return client.from('GrowCycle').update(data).eq('id', data.id).throwOnError().returns();
  };

  return useMutation(updateFeature, {
    onSuccess: () => {
      queryClient.invalidateQueries(['growCycles']);
    },
  });
}

import { PostgrestResponseFailure } from '@supabase/postgrest-js/src/types';
import useSupabase from 'hooks/useSupabase';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { FeatureInsert, FeatureRow } from 'types/generated';

export default function useUpdateFeature(): UseMutationResult<
  FeatureRow,
  PostgrestResponseFailure['error'],
  FeatureInsert
> {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const updateFeature = (data: FeatureInsert): any => {
    return client
      .from('features')
      .update({
        is_enabled: data.isEnabled,
      })
      .eq('id', data.id)
      .throwOnError();
  };

  return useMutation(updateFeature, {
    onSuccess: () => {
      queryClient.invalidateQueries(['features']);
    },
  });
}

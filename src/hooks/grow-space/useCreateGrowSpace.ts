import { PostgrestError } from '@supabase/supabase-js';
import useSupabase from 'hooks/useSupabase';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { GrowSpaceInsert } from 'types/generated';

export default function useCreateGrowSpace(): UseMutationResult<
  unknown,
  PostgrestError,
  GrowSpaceInsert
> {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const createGrowSpace = (data: GrowSpaceInsert): any => {
    return client.from('GrowSpace').insert([data]).throwOnError();
  };

  return useMutation(createGrowSpace, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['growSpace'] });
    },
  });
}

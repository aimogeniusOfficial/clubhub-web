import { PostgrestError } from '@supabase/supabase-js';
import useSupabase from 'hooks/useSupabase';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { BreederInsert } from 'types/generated';

export default function useCreateBreeder(): UseMutationResult<any, PostgrestError, BreederInsert> {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const insertGrowSpaceGallery = (data: BreederInsert): any => {
    return client.from('Breeder').insert([data]).throwOnError();
  };

  return useMutation(insertGrowSpaceGallery, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Breeder'] });
    },
  });
}

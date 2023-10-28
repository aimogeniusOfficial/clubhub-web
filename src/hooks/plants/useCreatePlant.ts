import { PostgrestError } from '@supabase/supabase-js';
import useSupabase from 'hooks/useSupabase';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

export default function useCreatePlant(): UseMutationResult<any, PostgrestError, any> {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const insertGrowSpaceGallery = (data: any): any => {
    return client.from('plants').insert([data]).throwOnError();
  };

  return useMutation(insertGrowSpaceGallery, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plants'] });
    },
  });
}

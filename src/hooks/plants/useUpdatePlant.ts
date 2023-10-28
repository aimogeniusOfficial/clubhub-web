import { PostgrestResponseFailure } from '@supabase/postgrest-js/src/types';
import useSupabase from 'hooks/useSupabase';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

function useUpdatePlant(): UseMutationResult<any, PostgrestResponseFailure['error'], any> {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const updatePlant = (data: any): any => {
    return client
      .from('plants')
      .update({
        name: data.name,
        plant_type_id: data.plant_type_id,
        breeder_id: data.breeder_id,
        cultivar_id: data.cultivar_id,
      })
      .eq('id', data.id)
      .throwOnError();
  };

  return useMutation(updatePlant, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plants'] });
    },
  });
}

export default useUpdatePlant;

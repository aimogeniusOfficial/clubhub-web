import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useSupabase from 'hooks/useSupabase';

function usePlant(plantId: string): UseQueryResult<PostgrestSingleResponse<any>> {
  const client = useSupabase();

  const fetchPlant = () => {
    return client
      .from('plants')
      .select('*, Breeders(*), Cultivars(*), plant_types(*)')
      .eq('id', plantId)
      .single()
      .throwOnError();
  };

  return useQuery(['plants'], fetchPlant);
}

export default usePlant;

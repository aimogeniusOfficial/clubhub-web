import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useSupabase from '../useSupabase';
import { CultivarDetailsRow } from 'types/generated';

function useCultivars(
  breederId: string | null,
): UseQueryResult<PostgrestSingleResponse<Array<CultivarDetailsRow>>> {
  const client = useSupabase();

  const fetchStrains = async () => {
    if (!breederId) {
      return Promise.resolve({ data: [], error: null, status: 'success', updatedAt: new Date() });
    }
    return client
      .from('Cultivar')
      .select(`id, name, description`)
      .eq('breederId', breederId)
      .throwOnError();
  };

  return useQuery(['Cultivar', breederId], fetchStrains, { enabled: !!breederId });
}

export default useCultivars;

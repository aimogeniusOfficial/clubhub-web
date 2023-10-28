import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useSupabase from 'hooks/useSupabase';
import { CultivarDetailsRow } from 'types/generated';

function useCultivar(
  cultivarId: string,
): UseQueryResult<PostgrestSingleResponse<CultivarDetailsRow>> {
  const client = useSupabase();

  const fetchCultivar = () => {
    return client
      .from('Cultivar')
      .select('*, Breeder(*), name, description, imageUrl, isVerified')
      .eq('id', cultivarId)
      .single()
      .throwOnError();
  };

  return useQuery(['Cultivar', { cultivarId }], fetchCultivar);
}

export default useCultivar;

import { PostgrestSingleResponse } from '@supabase/supabase-js';
import useSupabase from 'hooks/useSupabase';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { BreederRow } from 'types/generated';

function useBreeders(breederId: string): UseQueryResult<PostgrestSingleResponse<BreederRow>> {
  const client = useSupabase();

  const fetchBreeder = () => {
    return client
      .from('Breeder')
      .select('*')
      .eq('id', breederId)
      .single()
      .throwOnError();
  };

  return useQuery(['Breeder'], fetchBreeder);
}

export default useBreeders;

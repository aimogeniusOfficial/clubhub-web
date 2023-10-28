import { PostgrestSingleResponse } from '@supabase/supabase-js';
import useSupabase from 'hooks/useSupabase';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { GrowSpaceRow } from 'types/generated';

function useGrowSpace(growSpaceId: string): UseQueryResult<PostgrestSingleResponse<GrowSpaceRow>> {
  const client = useSupabase();

  const fetchGrowSpace = () => {
    return client
      .from('GrowSpace')
      .select('*, GrowCycle(*)')
      .eq('id', growSpaceId)
      .single()
      .throwOnError();
  };

  return useQuery(['growSpaceDetail'], fetchGrowSpace);
}

export default useGrowSpace;

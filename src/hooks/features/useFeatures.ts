import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useSupabase from 'hooks/useSupabase';
import { FeatureRow } from 'types/generated';

function useFeatures(): UseQueryResult<PostgrestSingleResponse<FeatureRow[]>> {
  const client = useSupabase();

  const fetchFeatures = () => {
    return client.from('FeatureFlag').select('*').order('id').throwOnError();
  };

  return useQuery(['features'], fetchFeatures);
}

export default useFeatures;

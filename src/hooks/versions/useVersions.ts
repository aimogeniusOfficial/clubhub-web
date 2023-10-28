import { PostgrestSingleResponse } from '@supabase/supabase-js';
import useSupabase from 'hooks/useSupabase';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ShamanVersionRow } from 'types/generated';

function useVersions(): UseQueryResult<PostgrestSingleResponse<ShamanVersionRow[]>> {
  const client = useSupabase();

  const fetchVersions = () => {
    return (
      client
        .from('versions')
        .select('*')
        // .order('created_at', { ascending: false })
        // .limit(5)
        .throwOnError()
    );
  };

  return useQuery(['versions'], fetchVersions);
}

export default useVersions;

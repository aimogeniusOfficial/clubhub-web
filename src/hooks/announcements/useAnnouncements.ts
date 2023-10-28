import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AnnouncementRow } from 'types/generated';

import useSupabase from '../useSupabase';

function useAnnouncements(): UseQueryResult<PostgrestSingleResponse<Array<AnnouncementRow>>> {
  const client = useSupabase();

  const fetchAnnouncement = async () => {
    return client.from('Announcement').select(`*`).throwOnError();
  };

  return useQuery(['Announcement'], fetchAnnouncement);
}

export default useAnnouncements;

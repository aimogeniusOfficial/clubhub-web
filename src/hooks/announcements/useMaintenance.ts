import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AnnouncementRow } from 'types/generated';
import useSupabase from '../useSupabase';

interface MaintenanceRow extends AnnouncementRow {
  finish: string;
}

function useMaintenance(): UseQueryResult<PostgrestSingleResponse<MaintenanceRow>> {
  const client = useSupabase();
  const now = new Date().toISOString();
  const fetchMaintenance = async () => {
    return (
      client
        .from('Announcement')
        .select('*')
        .eq('announcementType', 'Maintenance')
        .gt('finish', now)
        .lt('start', now)
        // Only one maintenance at a time. No overlaps allowed.
        .maybeSingle()
    );
  };

  return useQuery(['maintenance'], fetchMaintenance);
}

export default useMaintenance;

import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useSupabase from 'hooks/useSupabase';
import { UrlParams } from 'types';
import { GrowCycleRow, GrowSpaceRow } from 'types/generated';
import { getPagination } from 'utils/functions';

interface QueryKeyType {
  pageParam?: UrlParams;
  queryKey: (string | null | undefined)[];
}
function usePaginatedGrowCycle({
  growSpaceId,
  userId,
  name,
  status,
}: {
  growSpaceId?: string;
  userId?: string;
  name?: string;
  status?: string | null;
}): UseQueryResult<PostgrestSingleResponse<Array<GrowCycleRow & { growSpace?: GrowSpaceRow }>>> {
  const client = useSupabase();

  const fetchGrowCycles = ({ pageParam = { limit: '20', offset: '0' } }: QueryKeyType) => {
    const { from, to } = getPagination(Number(pageParam.offset), Number(pageParam.limit));

    const query = client
      .from('GrowCycle')
      .select('*, GrowSpace(*), GrowerCultivar(*)', { count: 'exact' });

    if (growSpaceId) {
      query.eq('growSpaceId', growSpaceId);
    }
    if (userId) {
      query.eq('userId', userId);
    }
    if (name) {
      query.textSearch('name', name);
    }
    if (status) {
      query.eq('status', status);
    }

    return query.range(from, to).throwOnError();
  };

  return useQuery(['GrowCycles', growSpaceId, userId, name, status], fetchGrowCycles, {
    enabled: !!growSpaceId || !!userId,
  });
}

export default usePaginatedGrowCycle;

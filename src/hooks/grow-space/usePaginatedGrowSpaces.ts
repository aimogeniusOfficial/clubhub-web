import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { UrlParams } from 'types';
import { GrowSpaceRow } from 'types/generated';
import { getPagination } from 'utils/functions';

import useSupabase from '../useSupabase';

interface QueryKeyType {
  pageParam?: UrlParams;
  queryKey: (string | undefined)[];
}
function usePaginatedGrowSpaces(): UseQueryResult<
  PostgrestSingleResponse<Array<GrowSpaceRow & { plants: any[] }>>
> {
  const client = useSupabase();

  const fetchGrowSpaces = ({ pageParam = { limit: '20', offset: '0' } }: QueryKeyType) => {
    const { from, to } = getPagination(Number(pageParam.offset), Number(pageParam.limit));

    return client.from('GrowSpace').select('*, GrowCycle(*)').range(from, to).throwOnError();
  };

  return useQuery(['growSpace'], fetchGrowSpaces);
}

export default usePaginatedGrowSpaces;

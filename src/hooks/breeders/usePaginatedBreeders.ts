import useSupabase from '../useSupabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { UrlParams } from 'types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getPagination } from 'utils/functions';
import { BreederRow } from 'types/generated';

interface QueryKeyType {
  pageParam?: UrlParams;
  queryKey: any;
}

function usePaginatedBreeders(
  name: string | null = null,
  country: string | null = null,
  state: string | null = null,
  id: number | null = null,
): UseQueryResult<PostgrestSingleResponse<Array<BreederRow>>> {
  const client = useSupabase();

  const fetchBreeders = ({ pageParam = { limit: '20', offset: '0' } }: QueryKeyType) => {
    const { from, to } = getPagination(Number(pageParam.offset), Number(pageParam.limit));

    let query = client.from('Breeder').select('*');

    if (name) {
      query = query.ilike('name', `%${name}%`);
    } else if (country) {
      query = query.ilike('country', `%${country}%`);
    } else if (state) {
      query = query.ilike('state', `%${state}%`);
    } else if (id) {
      query = query.ilike('id', `%${id}%`);
    }
    return query.range(from, to).throwOnError();
  };

  return useQuery({ queryKey: ['Breeder', name, country, state, id], queryFn: fetchBreeders });
}

export default usePaginatedBreeders;

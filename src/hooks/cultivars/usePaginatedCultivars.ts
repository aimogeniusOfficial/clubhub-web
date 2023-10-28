import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { UrlParams } from 'types';
import { CultivarRow } from 'types/generated';
import { getPagination } from 'utils/functions';

import useSupabase from '../useSupabase';

interface QueryKeyType {
  pageParam?: UrlParams;
}

function usePaginatedCultivars(
  searchName: string | null = null,
  breederId: string | null = null,
): UseQueryResult<PostgrestSingleResponse<Array<CultivarRow>>> {
  const client = useSupabase();

  const fetchStrains = ({ pageParam = { limit: '20', offset: '0' } }: QueryKeyType) => {
    const { from, to } = getPagination(Number(pageParam.offset), Number(pageParam.limit));

    let query = client.from('Cultivar').select('*, Breeder(*)');

    if (breederId) {
      query = query.eq('breederId', breederId);
    }
    if (searchName) {
      query = query.ilike('name', `%${searchName}%`);
    }

    return query.range(from, to).throwOnError();
  };
  return useQuery(['Cultivars', { searchName, breederId }], fetchStrains);
}

export default usePaginatedCultivars;

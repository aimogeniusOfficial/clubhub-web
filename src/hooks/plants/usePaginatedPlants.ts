import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useQuery, UseQueryResult, QueryFunctionContext } from '@tanstack/react-query';
import { getPagination } from 'utils/functions';

import useSupabase from '../useSupabase';

function usePaginatedPlants(
  breederId: string | null = null,
  plantTypeId: string | null = null,
  searchName: string | null = null,
): UseQueryResult<PostgrestSingleResponse<Array<any>>> {
  const client = useSupabase();

  const fetchPlants = ({ pageParam = { limit: '20', offset: '0' } }: QueryFunctionContext): any => {
    const { from, to } = getPagination(Number(pageParam.offset), Number(pageParam.limit));

    let query = client.from('plants').select('*, Breeders(*), Cultivars(*), plant_types(*)');

    if (breederId) {
      query = query.eq('breeder_id', breederId);
    }
    if (plantTypeId) {
      query = query.eq('plant_type_id', plantTypeId);
    }
    if (searchName) {
      query = query.ilike('name', `%${searchName}%`);
    }

    return query.range(from, to).throwOnError();
  };

  return useQuery(['plants', { breederId, plantTypeId, searchName }], fetchPlants);
}

export default usePaginatedPlants;

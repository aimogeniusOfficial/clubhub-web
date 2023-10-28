import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { SubscriptionPlanRow } from 'types/generated';

import useSupabase from '../useSupabase';

function useSubscriptionPlan(): UseQueryResult<
  PostgrestSingleResponse<Array<SubscriptionPlanRow>>
> {
  const client = useSupabase();

  const fetchMemberships = async () => {
    return client.from('SubscriptionPlan').select(`*`).throwOnError();
  };

  return useQuery(['SubscriptionPlan'], fetchMemberships);
}

export default useSubscriptionPlan;

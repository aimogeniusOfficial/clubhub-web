import { PostgrestSingleResponse } from '@supabase/supabase-js';
import useSupabase from 'hooks/useSupabase';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { UrlParams } from 'types';
import { UserInvitationRow } from 'types/generated';
import { getPagination } from 'utils/functions';

function usePaginatedUserInvitations(): UseQueryResult<
  PostgrestSingleResponse<Array<UserInvitationRow>>
> {
  const client = useSupabase();

  const fetchUserInvation = ({
    pageParam = { limit: '20', offset: '0' },
  }: {
    pageParam?: UrlParams;
    queryKey: (string | undefined)[];
  }) => {
    const { from, to } = getPagination(Number(pageParam.offset), Number(pageParam.limit));

    return client
      .from('UserInvitation')
      .select('*')
      .order('createdAt', { ascending: false })
      .range(from, to)
      .throwOnError();
  };

  return useQuery(['userInvitations'], fetchUserInvation);
}

export default usePaginatedUserInvitations;

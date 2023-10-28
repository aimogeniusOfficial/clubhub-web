import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';
import useSupabase from 'hooks/useSupabase';
import { UserRolesRow } from 'types/generated';

function useUserRoles(): UseQueryResult<PostgrestSingleResponse<Partial<UserRolesRow>[]>> {
  const client = useSupabase();
  const { user } = useAuth();

  const fetchUserRoles = () => {
    return client.from('UserRole').select('accessRoleId').eq('userId', user.id).throwOnError();
  };

  return useQuery(['userRole'], fetchUserRoles, {
    enabled: user !== undefined,
  });
}
export default useUserRoles;

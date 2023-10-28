import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useClient } from 'contexts/AuthContext';
import { AccessRolesRow, SubscriptionPlanRow, UserRolesRow } from 'types/generated';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  username: string;
  subscriptionPlan: SubscriptionPlanRow;
  subscriptionPlanId: string;
  subscriptionUsage: any;
  roles: UserRolesRow & { accessRole: AccessRolesRow }[];
  subscription: {
    activationDate: string;
    expiryDate: string;
  };
}

function useProfile(): UseQueryResult<AxiosResponse<UserProfile>, AxiosError<{ message: string }>> {
  const client = useClient();

  return useQuery(['me'], () => client.get('/me'));
}
export default useProfile;

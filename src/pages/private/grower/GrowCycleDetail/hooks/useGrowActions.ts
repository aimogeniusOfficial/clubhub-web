import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useClient } from 'contexts/AuthContext';

function useGrowActions(
  growCycleId?: string,
): UseQueryResult<AxiosResponse<any>, AxiosError<{ message: string }>> {
  const client = useClient();

  const fetchUserGrowActionsByGrowCycle = (): Promise<any> => {
    return client.get(`/grow-cycles/action/${growCycleId}`);
  };

  return useQuery(['GrowAction'], fetchUserGrowActionsByGrowCycle, {
    enabled: !!growCycleId,
  });
}
export default useGrowActions;

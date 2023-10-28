import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useClient } from 'contexts/AuthContext';

function useGrowCycle(
  growCycleId?: string,
): UseQueryResult<AxiosResponse<any>, AxiosError<{ message: string }>> {
  const client = useClient();

  const fetchGrowCycles = (): Promise<any> => {
    return client.get(`/grow-cycles/${growCycleId}`);
  };

  return useQuery(['GrowCycle', growCycleId], fetchGrowCycles, {
    enabled: !!growCycleId,
  });
}
export default useGrowCycle;

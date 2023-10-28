import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useClient } from 'contexts/AuthContext';
import { GrowCycleStatusEnum } from 'types/generated';

interface GrowCycleStatusUpdate {
  status: GrowCycleStatusEnum;
}

export default function useUpdateGrowCycleStatus(
  growCycleId?: string,
): UseMutationResult<
  AxiosResponse<unknown>,
  AxiosError<{ message: string }>,
  GrowCycleStatusUpdate
> {
  const queryClient = useQueryClient();
  const client = useClient();

  const updateGrowCycleStatus = (
    payload: GrowCycleStatusUpdate,
  ): Promise<AxiosResponse<unknown>> => {
    return client.post(`/grow-cycles/${growCycleId}/status`, payload);
  };

  return useMutation(updateGrowCycleStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GrowCycle', growCycleId] });
    },
  });
}

import { PostgrestError } from '@supabase/supabase-js';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';
import { BACKEND_URL } from 'utils/consts';

interface CreateGrowCycle {
  name: string;
  description: string;
  cultivarId: string;
  growerId: string;
}

export default function useUpdateGrowCycle(
  growCycleId: string,
): UseMutationResult<unknown, PostgrestError, any> {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const updateGrowCycle = async (data: CreateGrowCycle): Promise<any> => {
    const response = await fetch(`${BACKEND_URL}/grow-cycles/${growCycleId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || 'Unknown error occurred.');
    }

    return response.json();
  };

  return useMutation(updateGrowCycle, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GrowCycle', growCycleId] });
    },
  });
}

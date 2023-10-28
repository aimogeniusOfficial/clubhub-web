import { PostgrestError } from '@supabase/supabase-js';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';
import { CultivarWithGeneticLineage } from 'types/generated';
import { BACKEND_URL } from 'utils/consts';

export default function useCreateGrowerCultivar(): UseMutationResult<
  unknown,
  PostgrestError,
  any,
  void
> {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const createGrowerCultivar = async (data: CultivarWithGeneticLineage): Promise<any> => {
    const response = await fetch(`${BACKEND_URL}/my/cultivars`, {
      method: 'POST',
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

    return response;
  };

  return useMutation(createGrowerCultivar, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GrowerCultivars'] });
    },
  });
}

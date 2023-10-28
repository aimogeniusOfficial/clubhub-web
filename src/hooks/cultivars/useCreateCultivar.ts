import { PostgrestError } from '@supabase/supabase-js';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';
import { CultivarWithGeneticLineage } from 'types/generated';
import { BACKEND_URL } from 'utils/consts';

export default function useCreateCultivar(): UseMutationResult<
  unknown,
  PostgrestError,
  CultivarWithGeneticLineage,
  void
> {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const createCultivar = async (data: CultivarWithGeneticLineage): Promise<any> => {
    const response = await fetch(`${BACKEND_URL}/cultivars/create`, {
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

  return useMutation(createCultivar, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Cultivar'] });
    },
  });
}

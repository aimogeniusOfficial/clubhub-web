import { PostgrestError } from '@supabase/supabase-js';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';
import { CultivarInsert } from 'types/generated';
import { BACKEND_URL } from 'utils/consts';

export default function useCreateCultivar(): UseMutationResult<
  unknown,
  PostgrestError,
  CultivarInsert,
  void
> {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const updateCultivar = async (data: CultivarInsert): Promise<any> => {
    const response = await fetch(`${BACKEND_URL}/cultivars/${data.id}`, {
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

    return response;
  };

  return useMutation(updateCultivar, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Cultivar'] });
    },
  });
}

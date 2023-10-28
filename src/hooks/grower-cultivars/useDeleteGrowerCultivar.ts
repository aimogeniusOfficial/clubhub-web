import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';
import { BACKEND_URL } from 'utils/consts';

export default function useDeleteGrowerCultivar(): UseMutationResult<unknown, Error, string> {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const deleteGrowerCultivar = async (growerCultivarId: string): Promise<any> => {
    const response = await fetch(`${BACKEND_URL}/my/cultivars/${growerCultivarId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || 'Unknown error occurred.');
    }

    return response;
  };

  return useMutation(deleteGrowerCultivar, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GrowerCultivars'] });
    },
  });
}

import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';
import { AddSeedToGrowerVaultDTO } from 'pages/private/grower/MyVault/dtos/add-seed-to-grower.vault';
import { BACKEND_URL } from 'utils/consts';

function useAddSeedsToVault(): UseMutationResult<Response, any, AddSeedToGrowerVaultDTO> {
  const queryClient = useQueryClient();
  const { user, session } = useAuth();

  const addSeedsToVault = (payload: AddSeedToGrowerVaultDTO) => {
    return fetch(`${BACKEND_URL}/vault/${user.id}/seeds`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(payload),
    });
  };

  return useMutation(addSeedsToVault, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vault'] });
    },
  });
}

export default useAddSeedsToVault;

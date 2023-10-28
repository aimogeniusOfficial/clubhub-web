import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';
import { SeedVaultDto } from 'pages/private/grower/MyVault/dtos/seed-vault.dto';
import { BACKEND_URL } from 'utils/consts';

function useAddSeed(): UseMutationResult<Response, any, SeedVaultDto> {
  const queryClient = useQueryClient();
  const { user, session } = useAuth();

  const fetchAddSeed = (payload: SeedVaultDto) => {
    return fetch(`${BACKEND_URL}/my-vault/${user.id}/seeds/wishlist`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(payload),
    });
  };

  return useMutation(fetchAddSeed, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vault'] });
    },
  });
}

export default useAddSeed;

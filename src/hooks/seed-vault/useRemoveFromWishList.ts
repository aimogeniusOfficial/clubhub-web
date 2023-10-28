import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';
import { SeedVaultDto } from 'pages/private/grower/MyVault/dtos/seed-vault.dto';
import { BACKEND_URL } from 'utils/consts';

function useRemoveFromWishList(): UseMutationResult<Response, any, SeedVaultDto> {
  const queryClient = useQueryClient();
  const { user, session } = useAuth();

  const fetchRemoveFromWishList = (payload: SeedVaultDto) => {
    return fetch(
      `${BACKEND_URL}/my-vault/${user.id}/seeds/wishlist?cultivar=${payload.cultivar_id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
      },
    );
  };

  return useMutation(fetchRemoveFromWishList, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vault'] });
    },
  });
}

export default useRemoveFromWishList;

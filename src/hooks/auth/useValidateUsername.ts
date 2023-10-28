import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { BACKEND_URL } from 'utils/consts';

export interface ValidateUsername {
  username: string;
}

function useIsUsernameTaken(): UseMutationResult<boolean, unknown, ValidateUsername> {
  const queryClient = useQueryClient();

  const fetchisValidUsername = (payload: ValidateUsername) => {
    return fetch(`${BACKEND_URL}/auth/validate-username`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(response => response.json());
  };

  return useMutation(fetchisValidUsername, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}

export default useIsUsernameTaken;

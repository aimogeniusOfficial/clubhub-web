import { PostgrestError } from '@supabase/supabase-js';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { BACKEND_URL } from 'utils/consts';

function useStatus(): UseMutationResult<boolean, PostgrestError, string> {
  const queryClient = useQueryClient();

  const fetchStatus = (token: string) => {
    return fetch(`${BACKEND_URL}/invites/auth/${token}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ invitationToken: token }),
    }).then(response => response.json());
  };

  return useMutation(fetchStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInvitations'] });
    },
  });
}

export default useStatus;

import { useMutation } from '@tanstack/react-query';
import { BACKEND_URL } from '../../utils/consts';

function useVerifyUserInvitation() {
  const verifyUserInvitation = (payload: any) => {
    return fetch(`${BACKEND_URL}/auth/user-invitation`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(response => response.json());
  };

  return useMutation(verifyUserInvitation);
}

export default useVerifyUserInvitation;

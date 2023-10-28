import { AuthResponse, PostgrestError } from '@supabase/supabase-js';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { BACKEND_URL } from 'utils/consts';
import { SignInDto } from 'contexts/models/sign-in-dto';

function useSignIn(): UseMutationResult<AuthResponse, PostgrestError, SignInDto> {
  const queryClient = useQueryClient();

  const fetchSignIn = (payload: SignInDto) => {
    return fetch(`${BACKEND_URL}/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
  };

  return useMutation(fetchSignIn, {
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['auth']})
    }
  })
}

export default useSignIn;

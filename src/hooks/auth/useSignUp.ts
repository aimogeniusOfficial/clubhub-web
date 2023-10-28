import { AuthResponse, PostgrestError } from '@supabase/supabase-js';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { SignUpDto } from 'contexts/models/sign-up-dto';
import { BACKEND_URL } from 'utils/consts';

function useSignUp(): UseMutationResult<AuthResponse, PostgrestError, SignUpDto> {
  const queryClient = useQueryClient();

  const fetchSignUp = (payload: SignUpDto) => {
    return fetch(`${BACKEND_URL}/auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username: payload.username,
        email: payload.email,
        password: payload.password,
        name: payload.name,
        birthdate: payload.birthdate?.toISOString().split('T')[0],
        token: payload.token ?? null,
      }),
    }).then(response => response.json());
  };

  return useMutation(fetchSignUp, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}

export default useSignUp;

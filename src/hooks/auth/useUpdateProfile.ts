import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useClient } from 'contexts/AuthContext';

interface UpdateProfile {
  name: string;
  username: string;
}

export default function useUpdateProfile(): UseMutationResult<
  AxiosResponse<unknown>,
  AxiosError<{ message: string }>,
  UpdateProfile
> {
  const client = useClient();
  const queryClient = useQueryClient();

  const updateProfile = (payload: UpdateProfile): Promise<AxiosResponse<unknown>> => {
    return client.patch('/profile', payload);
  };

  return useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(['me']);
    },
  });
}

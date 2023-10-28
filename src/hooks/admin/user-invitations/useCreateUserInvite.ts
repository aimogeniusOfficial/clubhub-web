import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useClient } from 'contexts/AuthContext';
import { UserInvitationInsert } from 'types/generated';

export default function useCreateUserInvite(): UseMutationResult<
  AxiosResponse<unknown>,
  AxiosError<{ message: string }>,
  UserInvitationInsert,
  void
> {
  const client = useClient();
  const queryClient = useQueryClient();

  return useMutation(payload => client.post('/invites/create', payload), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInvitations'] });
    },
  });
}

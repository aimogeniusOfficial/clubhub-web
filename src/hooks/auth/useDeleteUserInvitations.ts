import { PostgrestError } from '@supabase/supabase-js';
import useSupabase from 'hooks/useSupabase';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

export default function useDeleteUserInvitations(): UseMutationResult<
  unknown,
  PostgrestError,
  string
> {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const deleteInvatations = (token: string): any => {
    return client.from('UserInvitation').delete().eq('token', token).throwOnError();
  };

  return useMutation(deleteInvatations, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInvitations'] });
    },
  });
}

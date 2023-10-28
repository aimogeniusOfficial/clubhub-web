import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useClient } from 'contexts/AuthContext';

function useDeleteUserChat(): UseMutationResult<any, unknown, string> {
  const client = useClient();
  const queryClient = useQueryClient();

  const fetchDeleteUserChat = (chatId: string): Promise<any> => {
    return client.delete(`/chat/${chatId}`);
  };

  return useMutation(fetchDeleteUserChat, {
    onSuccess: response => {
      console.log('Successfully deleted user chat.', response);
      queryClient.invalidateQueries({ queryKey: ['ShamanChat'] });
    },
  });
}
export default useDeleteUserChat;

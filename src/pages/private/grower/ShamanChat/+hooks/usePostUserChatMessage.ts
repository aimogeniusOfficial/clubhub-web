import { useClient } from 'contexts/AuthContext';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

interface PostUserChatMessage {
  message: string;
  messageId: string;
}

function usePostUserChatMessage(): UseMutationResult<any, unknown, PostUserChatMessage> {
  const client = useClient();
  const queryClient = useQueryClient();

  const fetchPostUserChatMessage = ({ message, messageId }: PostUserChatMessage): Promise<any> => {
    return client.post(`/chat/message`, { content: message, messageId });
  };

  return useMutation(fetchPostUserChatMessage, {
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ['ShamanChat'] });
      console.log('Successfully posted message to user chat.', response);
    },
  });
}
export default usePostUserChatMessage;

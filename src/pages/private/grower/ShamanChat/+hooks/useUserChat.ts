import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useClient } from 'contexts/AuthContext';

function useUserChat(): UseQueryResult<AxiosResponse<any>, AxiosError<any>> {
  const client = useClient();

  const fetchUserShamanChat = (): Promise<any> => {
    return client.get(`/chat`);
  };

  return useQuery(['ShamanChat'], fetchUserShamanChat);
}
export default useUserChat;

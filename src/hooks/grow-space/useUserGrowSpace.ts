import { useQuery } from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';
import { BACKEND_URL } from 'utils/consts';

function useUserGrowSpaces() {
  const { session } = useAuth();

  const getUserGrowSpaces = async (): Promise<any[]> => {
    const response = await fetch(`${BACKEND_URL}/my/grow-spaces`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch grow cycles');
    }

    return response.json();
  };

  return useQuery(['userGrowSpaces'], getUserGrowSpaces, {});
}

export default useUserGrowSpaces;

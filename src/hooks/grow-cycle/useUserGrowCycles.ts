import { useQuery } from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';
import { BACKEND_URL } from 'utils/consts';

function useUserGrowCycles({ userId }: { userId: string }) {
  const { session } = useAuth();

  const getUserGrowCycles = async () => {
    const response = await fetch(`${BACKEND_URL}/grow-cycle/${userId}`, {
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

  return useQuery(['userGrowCycles'], getUserGrowCycles, {});
}

export default useUserGrowCycles;

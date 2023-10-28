import { useQuery } from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';
import { BACKEND_URL } from 'utils/consts';

function useVaultSeeds(searchName: string | null = null): any {
  const { user, session } = useAuth();

  const getVaultSeeds = async (): Promise<any> => {
    const response = await fetch(`${BACKEND_URL}/vault/${user.id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch session');
    }

    return response.json();
  };

  return useQuery(['vault', { searchName }], getVaultSeeds);
}

export default useVaultSeeds;

import { useQuery } from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';
import { BACKEND_URL } from 'utils/consts';

export interface UserSeedCultivar {
  id: string;
  name: string;
  description: string;
  growerId: string;
  seedType: string;
  growthType: string;
  plantType: string;
}

function useUserSeedCultivars() {
  const { session } = useAuth();

  const getUserSeedCultivars = async (): Promise<UserSeedCultivar[]> => {
    const response = await fetch(`${BACKEND_URL}/my/cultivars`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch seed cultivars');
    }

    return response.json();
  };

  return useQuery(['GrowerCultivars'], getUserSeedCultivars, {});
}
export default useUserSeedCultivars;

import { useQuery } from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';

import { BACKEND_URL } from '../../utils/consts';

export interface BreederCultivar {
  id: number;
  name: string;
  breederId: number;
  breeder: {
    name: string;
  };
}

function useBreederCultivars() {
  const { session } = useAuth();

  const getMyBreederCultivars = async (): Promise<BreederCultivar[]> => {
    const response = await fetch(`${BACKEND_URL}/my/breeder-cultivars`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch breeder cultivars');
    }

    return response.json();
  };

  return useQuery(['BreederCultivars'], getMyBreederCultivars, {});
}
export default useBreederCultivars;

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import { BACKEND_URL } from '../../utils/consts';

function useGrowerCultivars(plantType: string): UseQueryResult<any[]> {
  const { session } = useAuth();

  const fetchGrowerCultivars = (): Promise<any> => {
    return fetch(`${BACKEND_URL}/my/cultivars${plantType ? `?plantType=${plantType}` : ''}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
    }).then(response => response.json());
  };

  return useQuery(['GrowerCultivars', plantType], fetchGrowerCultivars);
}

export default useGrowerCultivars;

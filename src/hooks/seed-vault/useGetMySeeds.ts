import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';
import { SeedVaultRow } from 'types/generated';
import { BACKEND_URL } from 'utils/consts';

function useGetMySeeds(): UseQueryResult<SeedVaultRow[]> {
  const { user, session } = useAuth();

  const fetchMySeeds = () => {
    return fetch(`${BACKEND_URL}/my-vault/${user.id}/seeds`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
    })
    .then(response => response.json())
  };

  return useQuery(['vault'], fetchMySeeds)
}

export default useGetMySeeds;

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';
import { ClubRow } from 'types/generated';
import { BACKEND_URL } from 'utils/consts';

function useGetClubs(): UseQueryResult<ClubRow[]> {
  const { session } = useAuth();

  const fetchAllClubs = () => {
    return fetch(`${BACKEND_URL}/clubs`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
    }).then(response => response.json());
  };

  return useQuery(['clubs'], fetchAllClubs);
}

export default useGetClubs;

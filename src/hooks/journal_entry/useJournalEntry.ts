import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';
import { BACKEND_URL } from 'utils/consts';

function useJournalEntry(journalEntryId: string): UseQueryResult<any> {
  const { session } = useAuth();

  const fetchJournalEntry = (): Promise<any> => {
    console.log('fetchJournalEntry', journalEntryId);
    return fetch(`${BACKEND_URL}/journal/${journalEntryId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
    }).then(response => response.json());
  };

  return useQuery(['JournalEntryDetail'], fetchJournalEntry);
}

export default useJournalEntry;

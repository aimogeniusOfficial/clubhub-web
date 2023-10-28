import {
  QueryFunctionContext,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';
import { JournalEntryWithAttachments } from 'types/generated';
import { PaginatedResponse } from 'types/pagination';
import { BACKEND_URL } from 'utils/consts';

function usePaginatedJournalEntry(
  growSpaceId?: string,
  growCycleId?: string,
): UseInfiniteQueryResult<PaginatedResponse<JournalEntryWithAttachments>, Error> {
  const { session } = useAuth();
  async function fetchJournalEntry({
    pageParam = 1,
  }: QueryFunctionContext<[string], number>): Promise<any> {
    let url = `${BACKEND_URL}/journal?skip=${(pageParam - 1) * 10}&take=10`;

    if (growSpaceId) {
      url += `&growSpaceId=${growSpaceId}`;
    }

    if (growCycleId) {
      url += `&growCycleId=${growCycleId}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error while fetching the journal entries. Please try again.');
    }
    return response.json();
  }

  const queryKey = growSpaceId ? `JournalEntry?growSpace=${growSpaceId}` : 'JournalEntry';

  return useInfiniteQuery([queryKey], fetchJournalEntry, {
    getNextPageParam: lastPage => {
      if (lastPage.meta.next) return lastPage.meta.next;
      return false;
    },
  });
}

export default usePaginatedJournalEntry;

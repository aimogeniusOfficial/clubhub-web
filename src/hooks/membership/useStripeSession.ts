import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useClient } from 'contexts/AuthContext';
import { SubscriptionPlan } from 'types/generated';

interface SessionResponse {
  plan: any;
  subscription: SubscriptionPlan;
}

interface ErrorResponse {
  statusCode: number;
  message: string;
}

function useStripeSession(
  stripeSession: string | null,
): UseQueryResult<AxiosResponse<SessionResponse>, AxiosError<ErrorResponse>> {
  const client = useClient();

  const fetchSession = (): Promise<SessionResponse> => {
    return client.get(`/payment/${stripeSession}`);
  };

  return useQuery(['stripeSession', stripeSession], fetchSession, {
    enabled: !!stripeSession,
  });
}

export default useStripeSession;

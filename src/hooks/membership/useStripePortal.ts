import { PostgrestError } from '@supabase/supabase-js';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useClient } from 'contexts/AuthContext';

export default function useStripePortal(): UseMutationResult<any, PostgrestError, any> {
  const client = useClient();

  const createStripeCheckout = (): any => {
    return client.get('/payment/portal');
  };

  return useMutation(createStripeCheckout);
}

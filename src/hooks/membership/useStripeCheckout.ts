import { PostgrestError } from '@supabase/supabase-js';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';
import { BACKEND_URL } from 'utils/consts';

export default function useStripeCheckout(): UseMutationResult<any, PostgrestError, string> {
  const { session } = useAuth();

  const createStripeCheckout = (price: string): any => {
    return fetch(`${BACKEND_URL}/payment/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        itemsList: [{ price, quantity: 1 }],
      }),
    });
  };

  return useMutation(createStripeCheckout);
}

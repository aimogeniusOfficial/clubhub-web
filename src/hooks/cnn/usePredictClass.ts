import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useAuth } from 'contexts/AuthContext';
import { BACKEND_URL } from 'utils/consts';

interface Prediction {
  class: string;
  confidence: number;
}

function useGetPrediction(supabase_storage_url: string): UseQueryResult<Prediction> {
  const { session } = useAuth();
  const body = JSON.stringify({ image_url: supabase_storage_url });
  console.log(body);

  const fetchPrediction = () => {
    return fetch(`${BACKEND_URL}/cnn/predict`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ image_url: supabase_storage_url }),
    }).then(response => response.json());
  };

  return useQuery(['cnn'], fetchPrediction);
}

export default useGetPrediction;

import { PostgrestError } from '@supabase/supabase-js';
import useSupabase from 'hooks/useSupabase';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

export default function useExportCsv(): UseMutationResult<unknown, PostgrestError, string> {
  const client = useSupabase();

  const exportCsv = (tableName: string): any => {
    return client.from(tableName).select('*').csv();
  };

  return useMutation(exportCsv);
}

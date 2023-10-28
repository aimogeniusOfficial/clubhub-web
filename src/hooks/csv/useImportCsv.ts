import { PostgrestError, User } from '@supabase/supabase-js';
import { useAuth } from 'contexts/AuthContext';
import useSupabase from 'hooks/useSupabase';
import Papa from 'papaparse';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { snakeToCamel } from 'utils/functions';

const getFormattedContent = async (file: File, user: User): Promise<any[]> => {
  const csvData: any[] = [];

  await new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete(results: any) {
        const dataWithUserId = results.data.map((row: any) => {
          return { ...row, user_id: user.id };
        });
        csvData.push(...dataWithUserId);
        resolve(csvData);
      },
      error(err: any) {
        reject(err);
      },
    });
  });

  return csvData;
};

export default function useImportCsv(): UseMutationResult<
  unknown,
  PostgrestError,
  { tableName: string; file: File }
> {
  const client = useSupabase();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const importCsv = async ({
    tableName,
    file,
  }: {
    tableName: string;
    file: File;
  }): Promise<any> => {
    const csvData = await getFormattedContent(file, user);

    return client.from(tableName).insert(csvData).throwOnError();
  };

  return useMutation(importCsv, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [snakeToCamel(variables.tableName)]});
    },
  });
}

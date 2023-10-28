import { PostgrestError } from '@supabase/supabase-js';
import { uuid } from '@supabase/supabase-js/dist/main/lib/helpers';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import useSupabase from 'hooks/useSupabase';

type UploadFilesArgs = {
  journalEntryId: number;
  files: File[];
  userId: string;
};

export default function useUploadEntryFile(): UseMutationResult<
  void,
  PostgrestError,
  UploadFilesArgs
> {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const JOURNAL_STORAGE_BUCKET = 'journal';
  const JOURNAL_ENTRY_ATTACHMENT_TABLE = 'JournalEntryAttachment';

  const uploadFiles = async ({ journalEntryId, files, userId }: UploadFilesArgs): Promise<void> => {
    const uploadPromises = files.map(async file => {
      const { data: storageData, error: uploadError } = await client.storage
        .from(JOURNAL_STORAGE_BUCKET)
        .upload(`${userId}/${uuid()}_${file.name}`, file);

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = client.storage.from(JOURNAL_STORAGE_BUCKET).getPublicUrl(storageData?.path || '');

      if (!publicUrl) {
        throw new Error('Error getting file url');
      }

      const { error: insertError } = await client
        .from(JOURNAL_ENTRY_ATTACHMENT_TABLE)
        .insert([{ fileUrl: publicUrl, journalEntryId }]);

      if (insertError) {
        throw Error('Error inserting file into database');
      }
    });

    // Removing the try/catch here
    await Promise.all(uploadPromises);
  };

  return useMutation(uploadFiles, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['JournalEntry'] });
    },
  });
}

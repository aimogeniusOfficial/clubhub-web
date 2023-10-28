import React, { useRef } from 'react';

import { Modal, ModalProps, Group, Button, Stack, Text } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import useImportCsv from 'hooks/csv/useImportCsv';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

const BreederInsertModal = ({
  opened,
  onClose,
}: Pick<ModalProps, 'opened' | 'onClose'>): JSX.Element => {
  const openRef = useRef<() => void>(null);
  const importCsv = useImportCsv();
  const [csvFiles, setCsvFiles] = React.useState<File[]>([]);

  const handleSubmit = async (): Promise<void> => {
    const file = csvFiles[0];
    const formData = new FormData();
    formData.append('file', file);
    if (!file) {
      showErrorNotification('Please attach a correct CSV file');
      return;
    }

    importCsv.mutate(
      { file, tableName: 'breeders' },
      {
        onSuccess: () => showSuccessNotification('Data imported successfully'),
        onError: error => showErrorNotification('Failed to import', error.message),
        onSettled: () => onClose(),
      },
    );
  };
  return (
    <Modal
      size='md'
      zIndex={9999}
      opened={opened}
      onClose={onClose}
      title='Select file with breeder'
    >
      <Stack>
        <div>
          {csvFiles && csvFiles.length > 0 && (
            <Text mb='xs' size='sm'>
              {csvFiles[0].name}
            </Text>
          )}
          <Dropzone
            openRef={openRef}
            onDrop={files => setCsvFiles(files)}
            activateOnClick={false}
            styles={{ inner: { pointerEvents: 'all' } }}
            accept={['.csv']}
          >
            <Group position='center' align='center'>
              <Button variant='outline' onClick={() => openRef.current!()}>
                Select CSV file
              </Button>
            </Group>
          </Dropzone>
        </div>
        <Group position='right'>
          <Button onClick={handleSubmit}>Insert</Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default BreederInsertModal;

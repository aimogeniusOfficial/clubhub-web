import React, { RefObject } from 'react';

import { ActionIcon, Group, rem, Stack, Text } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { IconPhoto, IconX } from '@tabler/icons-react';

import { getIsUrlImage, renderMedia } from '../GrowerEntryCard';

interface FileInputProps {
  closeDropzone: () => void;
  openRef: RefObject<() => void>;
  handleDrop: (files: File[]) => void;
  files: { file: File; objectUrl: string }[];
  existingAttachments?: { fileUrl: string; id: number; journalEntryId: number }[];
}
const RenderMedia = ({ fileUrl, id }: { fileUrl: string; id: number }) => {
  const isImage = getIsUrlImage(fileUrl);
  return isImage ? (
    <img src={fileUrl} alt={fileUrl} key={id} style={{ maxHeight: '200px', width: 'auto' }} />
  ) : (
    <video src={fileUrl} key={id} style={{ maxHeight: '200px', width: 'auto' }} controls />
  );
};

const FileEntry = ({
  closeDropzone,
  openRef,
  handleDrop,
  files,
  existingAttachments,
}: FileInputProps): JSX.Element => {
  return (
    <div style={{ position: 'relative' }}>
      <ActionIcon
        onClick={closeDropzone}
        size='lg'
        pos='absolute'
        right={0}
        m='md'
        variant='filled'
        radius='xl'
        sx={{ zIndex: 99 }}
      >
        <IconX size={20} />
      </ActionIcon>
      <Dropzone
        openRef={openRef}
        onDrop={handleDrop}
        styles={{ inner: { pointerEvents: 'all' } }}
        accept={{
          'image/*': [],
          'video/*': [],
        }}
      >
        <Group
          position='center'
          spacing='xl'
          style={{ minHeight: rem(220), pointerEvents: 'none' }}
        >
          <Stack>
            {existingAttachments?.length ? (
              <>
                {existingAttachments.map(({ fileUrl, id }) => (
                  <RenderMedia fileUrl={fileUrl} id={id} />
                ))}
              </>
            ) : null}

            {files.length ? (
              <>
                {files.map(({ file, objectUrl }) =>
                  file.type.startsWith('image/') ? (
                    <img
                      src={objectUrl}
                      alt={file.name}
                      key={file.name}
                      style={{ maxHeight: '200px', width: 'auto' }}
                    />
                  ) : (
                    <video
                      src={objectUrl}
                      key={file.name}
                      style={{ maxHeight: '200px', width: 'auto' }}
                      controls
                    />
                  ),
                )}
              </>
            ) : null}
          </Stack>

          {!existingAttachments?.length && !files.length && (
            <>
              <IconPhoto size='3.2rem' stroke={1.5} />

              <div>
                <Text size='xl' inline>
                  Drag images here or click to select files
                </Text>
                <Text size='sm' color='dimmed' inline mt={7}>
                  Attach as many files as you like, each file should not exceed 5mb
                </Text>
              </div>
            </>
          )}
        </Group>
      </Dropzone>
    </div>
  );
};

export default FileEntry;

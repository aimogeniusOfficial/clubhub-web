import { ActionIcon, Group, Paper } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import React from 'react';

const ChatScrollToBottom = ({ inView, emitScrollToBottom }: any) => {
  return (
    <Group
      sx={{
        visibility: inView ? 'hidden' : 'visible',
        position: 'absolute',
        bottom: 60,
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 999,
      }}
    >
      <Paper shadow='md' radius='xl' withBorder p={0}>
        <ActionIcon variant='filled' color='blue' radius='xl' onClick={emitScrollToBottom}>
          <IconChevronDown />
        </ActionIcon>
      </Paper>
    </Group>
  );
};
export default ChatScrollToBottom;

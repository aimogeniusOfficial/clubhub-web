import React, { useState } from 'react';

import { ActionIcon, Stack, useMantineTheme, Textarea, Flex, Space } from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import { IconSend, IconX } from '@tabler/icons-react';

import Speaker from 'pages/private/grower/ShamanChat/+models/speaker.enum';
import PromptContainer from './PromptContainer';

interface ChatBoxProps {
  handleAddMessage: (speaker: Speaker, message: string) => void;
  handleDeleteChat: () => void;
}

const ChatBox = ({ handleAddMessage, handleDeleteChat }: ChatBoxProps): JSX.Element => {
  const mockPrompts = ['how to plant sunflower', 'Detailed plant watering plan for'];
  const theme = useMantineTheme();

  const [value, setValue] = useState('');

  const isSendDisabled = !/\S/.test(value) || value.length < 2;

  const handleSendMessage = (): void => {
    handleAddMessage(Speaker.USER, value);
    setValue('');
  };

  // KEYBOARD LISTENER
  const handleKeyDown =
    /\S/.test(value) && value.length >= 2
      ? getHotkeyHandler([['Enter', handleSendMessage]])
      : undefined;
  return (
    <Stack
      sx={{
        padding: theme.spacing.md,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: theme.spacing.sm,
        [theme.fn.smallerThan('sm')]: {
          padding: 0,
        },
        position: 'relative',
      }}
    >
      <PromptContainer prompts={mockPrompts} setChatboxValue={setValue} />

      <Flex justify='center' align='center'>
        <Textarea
          value={value}
          size='lg'
          autosize
          maxRows={7}
          styles={() => ({
            // HIDE SCROLLBAR
            input: {
              overflowY: 'auto',
              scrollbarWidth: 'none', // For Firefox
              msOverflowStyle: 'none', // For Internet Explorer and Edge
              '&::-webkit-scrollbar': {
                display: 'none', // For Chrome, Safari and Opera
              },
            },
          })}
          onChange={event => setValue(event.currentTarget.value)}
          sx={{ flexGrow: 1 }}
          placeholder='Say something nice . . . '
          onKeyDown={handleKeyDown}
          w='100%'
          color='blue'
        />

        <Space w='md' />

        <ActionIcon
          size={38}
          variant='gradient'
          gradient={{ from: 'cyan', to: 'blue', deg: 135 }}
          onClick={handleSendMessage}
        >
          <IconSend size={24} />
        </ActionIcon>

        <Space w='md' />

        <ActionIcon size='lg' variant='light' onClick={handleDeleteChat}>
          <IconX />
        </ActionIcon>
      </Flex>
    </Stack>
  );
};

export default ChatBox;

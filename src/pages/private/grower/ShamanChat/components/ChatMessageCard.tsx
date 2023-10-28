import React from 'react';

import { Paper, Text } from '@mantine/core';

interface ChatMessageProps {
  text: string;
  fromUser: boolean;
}

const ChatMessageCard = ({ text, fromUser }: ChatMessageProps): JSX.Element => {
  const background = fromUser ? 'indigo' : 'white';
  const color = fromUser ? 'white' : 'black';

  return (
    <Paper
      p='sm'
      radius='md'
      shadow='sm'
      bg={background}
      maw='80%'
      style={{
        alignSelf: fromUser ? 'flex-end' : 'flex-start',
      }}
    >
      <Text color={color}>{text}</Text>
    </Paper>
  );
};

export default ChatMessageCard;

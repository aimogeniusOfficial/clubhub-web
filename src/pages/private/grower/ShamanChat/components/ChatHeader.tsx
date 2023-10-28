import React from 'react';
import { Badge, Center, Group, Stack, Text, useMantineTheme } from '@mantine/core';
import TengriStarWhite from 'assets/logos/tengri-star-white.svg';
import TengriStar from 'assets/logos/tengri-star.svg';

const ChatHeader = (): any => {
  const theme = useMantineTheme();
  return (
    <Stack mb={theme.spacing.xl}>
      <Center>
        <img
          src={theme.colorScheme === 'dark' ? TengriStarWhite : TengriStar}
          alt='tengri-star'
          width={60}
        />
      </Center>
      <Group position='center'>
        <Text size='xl' align='center' weight={600}>
          Welcome to Shaman Chat
        </Text>
        <Badge color='lime' fw={600}>
          ALPHA
        </Badge>
      </Group>
      <Text align='center' color='dimmed'>
        Choose a prompt below or write your own to start chatting with Shaman
      </Text>
    </Stack>
  );
};
export default ChatHeader;

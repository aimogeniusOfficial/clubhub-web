import React, { useEffect, useRef, useState } from 'react';

import { ScrollArea, Stack, useMantineTheme } from '@mantine/core';
import useDeleteUserChat from 'pages/private/grower/ShamanChat/+hooks/useDeleteUserChat';
import usePostUserChatMessage from 'pages/private/grower/ShamanChat/+hooks/usePostUserChatMessage';
import useUserChat from 'pages/private/grower/ShamanChat/+hooks/useUserChat';
import { Chat } from 'pages/private/grower/ShamanChat/+models/chat';
import { ChatMessage } from 'pages/private/grower/ShamanChat/+models/chat-message';
import Speaker from 'pages/private/grower/ShamanChat/+models/speaker.enum';
import ChatHeader from 'pages/private/grower/ShamanChat/components/ChatHeader';
import ChatScrollToBottom from 'pages/private/grower/ShamanChat/components/ChatScrollToBottom';
import Loading from 'pages/shared/Loading';
import { useInView } from 'react-intersection-observer';
import { showSuccessNotification } from 'utils/notifications';
import { v4 as uuidv4 } from 'uuid';

import ChatBox from './components/ChatBox';
import ChatHistoryDisplay from './components/ChatHistoryDisplay';
import QuotaReached from './components/QuotaReached';

const ShamanChat = (): JSX.Element => {
  const theme = useMantineTheme();
  const postUserChatMessage = usePostUserChatMessage();
  const { data: chatData } = useUserChat();
  const deleteChat = useDeleteUserChat();

  // TODO FUTURE ME - figure out the history part here

  const initialChat = {
    id: uuidv4(),
    growerId: null,
    history: [],
  } as Chat;

  const [chat, setChat] = useState<Chat>(initialChat);

  // LOAD EXISTING CHAT
  useEffect(() => {
    if (chatData?.data) {
      const savedChat = {
        id: chatData.data.id,
        growerId: chatData.data.userId,
        history: chatData.data.messages,
      };

      setChat(savedChat);
    }
  }, [chatData]);

  const [loading] = useState(false);
  const [quota] = useState(false);
  const dummy = useRef<HTMLDivElement>(null);

  const { ref, inView } = useInView({
    /* Optional options */
    delay: 600,
    threshold: 1,
  });

  const scrollToBottom = (): void => {
    dummy.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // TODO FUTURE ME - convert to service actions
  const handleAddMessage = (speaker: Speaker, content: string): void => {
    const chatMessage = {
      id: uuidv4(),
      speaker,
      content,
    } as ChatMessage;
    console.log('chatMessage', chatMessage);

    // TODO FUTURE ME - separate USER and BOT message
    if (speaker === Speaker.USER) {
      setChat(prev => ({ ...prev, history: [...prev.history, chatMessage] }));
      postUserChatMessage.mutate(
        {
          message: content,
          messageId: chatMessage.id,
        },
        {
          onSuccess: response => {
            const botMessage = response.data;
            console.log('Should have a response from chat bot server', response);
            setChat(prev => ({ ...prev, history: [...prev.history, botMessage] }));
          },
        },
      );
    }

    scrollToBottom();
  };

  const handleDeleteChat = (): void => {
    const chatId = chatData?.data?.id;

    if (!chatId) {
      return;
    }

    deleteChat.mutate(chatData?.data?.id, {
      onSuccess: () => {
        showSuccessNotification('Chat Clear Success', 'Your shaman chat has been cleared.');
        setChat(initialChat);
      },
    });
    // const chatId = chat.;
  };

  if (loading) {
    return <Loading />;
  }
  if (quota) {
    return <QuotaReached />;
  }

  // TODO FUTURE ME - ChatScrollArea wrapper component
  return (
    <Stack h='80vh'>
      <ScrollArea
        pr='md'
        scrollbarSize={6}
        offsetScrollbars
        sx={{
          minHeight: '70vh',
          [theme.fn.smallerThan('sm')]: {
            minHeight: '65vh',
          },
        }}
      >
        <ChatHeader />

        <Stack>
          <ChatScrollToBottom inView={inView} emitScrollToBottom={scrollToBottom} />
          <ChatHistoryDisplay history={chat.history} />
          <div ref={ref} />
          <div ref={dummy} />
        </Stack>
      </ScrollArea>

      <ChatBox handleAddMessage={handleAddMessage} handleDeleteChat={handleDeleteChat} />
    </Stack>
  );
};

export default ShamanChat;

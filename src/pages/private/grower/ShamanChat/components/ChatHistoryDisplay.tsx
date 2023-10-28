import { ReactElement } from 'react';

import { ChatMessage } from 'pages/private/grower/ShamanChat/+models/chat-message';
import Speaker from 'pages/private/grower/ShamanChat/+models/speaker.enum';
import ChatMessageCard from 'pages/private/grower/ShamanChat/components/ChatMessageCard';

interface ChatHistoryDisplayProps {
  history: ChatMessage[];
}

const ChatHistoryDisplay = ({ history }: ChatHistoryDisplayProps): ReactElement => {
  return (
    <>
      {history.map(({ id, speaker, content }) => {
        return <ChatMessageCard key={id} text={content} fromUser={speaker === Speaker.USER} />;
      })}
    </>
  );
};

export default ChatHistoryDisplay;

import { ChatMessage } from 'pages/private/grower/ShamanChat/+models/chat-message';

export interface Chat {
  id: string | null;
  growerId: string | null;
  history: ChatMessage[];
}

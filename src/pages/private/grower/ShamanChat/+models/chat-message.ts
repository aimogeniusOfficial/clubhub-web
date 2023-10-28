import Speaker from 'pages/private/grower/ShamanChat/+models/speaker.enum';

export interface ChatMessage {
  id: string;
  speaker: Speaker;
  content: string;
}

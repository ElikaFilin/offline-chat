interface Message {
  id: number;
  text: string;
  createdAt: Date;
  senderId: number;
  seen: boolean;
}

export interface ChatData {
  id: number;
  name: string;
  avatar: string;
  messages: Message[];
}

export interface Props {
  chat: ChatData;
  onClick: () => void;
}

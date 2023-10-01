export interface Message {
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
}

export interface Props {
  chat: ChatData;
  messageList: Message[];
  onClick: () => void;
}

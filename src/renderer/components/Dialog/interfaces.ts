import { Dispatch, SetStateAction } from 'react';
import { ChatData } from '../ChatItem/interfaces';

export interface Props {
  chat: ChatData;
  setNewMessage: Dispatch<SetStateAction<string>>;
  newMessage: string;
  handleSendMessage: () => void;
}

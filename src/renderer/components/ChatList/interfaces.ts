import { Dispatch, SetStateAction } from 'react';
import { ChatData, Message } from '../ChatItem/interfaces';

export interface Props {
  chats: ChatData[];
  setOpenedChat: Dispatch<SetStateAction<ChatData>>;
  messageList: Message[];
}

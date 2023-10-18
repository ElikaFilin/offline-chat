import { Dispatch, SetStateAction } from 'react';
import { ChatData } from '../ChatItem/interfaces';

export interface Props {
  chats: ChatData[];
  setOpenedChat: Dispatch<SetStateAction<ChatData>>;
  openedChat: ChatData | null;
}

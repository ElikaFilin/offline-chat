import { Message } from '../ChatItem/interfaces';

export interface Props {
  messageList: Message[] | [] | undefined;
  newMessage: string;
}

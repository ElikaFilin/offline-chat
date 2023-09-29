import ChatItem from '../ChatItem/ChatItem';
import { Props } from './interfaces';

export default function ChatList({ chats, setOpenedChat }: Props) {
  return (
    <>
      {chats.map((chat) => (
        <ChatItem
          chat={chat}
          key={chat.id}
          onClick={() => setOpenedChat(chat)}
        />
      ))}
    </>
  );
}

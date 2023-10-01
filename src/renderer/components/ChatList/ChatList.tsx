import ChatItem from '../ChatItem/ChatItem';
import { Props } from './interfaces';

export default function ChatList({ chats, setOpenedChat, messageList }: Props) {
  return (
    <>
      {chats.map((chat) => (
        <ChatItem
          chat={chat}
          messageList={messageList}
          key={chat.id}
          onClick={() => setOpenedChat(chat)}
        />
      ))}
    </>
  );
}

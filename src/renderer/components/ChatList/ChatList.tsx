import ChatItem from '../ChatItem/ChatItem';
import { Props } from './interfaces';

export default function ChatList({ chats, setOpenedChat, openedChat }: Props) {
  return (
    <>
      {chats.map((chat) => {
        return (
          <ChatItem
            chat={chat}
            key={chat.id}
            onClick={() => {
              setOpenedChat(chat);
            }}
            openedChat={openedChat}
          />
        );
      })}
    </>
  );
}

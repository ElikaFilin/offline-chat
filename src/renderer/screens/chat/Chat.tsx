import { useState } from 'react';
import styles from './chat.module.scss';
import NewMessageIcon from '../../../../assets/icons/new-message-icon.svg';
import { getRandomNumber } from '../../utils';
import { ChatList } from '../../components';
import chatKey, { MessagesKey } from './constants';
import Dialog from '../../components/Dialog/Dialog';
import { ChatData, Message } from '../../components/ChatItem/interfaces';
import Avatar from '../../../../assets/images/avatar.png';
import { useElectronStore } from '../../hooks/ElectronStoreContext';

export default function ChatScreen() {
  const [openedChat, setOpenedChat] = useState<ChatData>();
  const [newMessage, setNewMessage] = useState<string>('');
  const [messageList, setMessageList] = useState<Message[] | []>([]);
  const { forceRerender } = useElectronStore();

  const handleAddChatButton = () => {
    const chatData = {
      id: getRandomNumber(),
      name: 'Darryl',
      avatar: Avatar,
    };
    window.electron.store.addChat(chatData);
    setOpenedChat(chatData);
  };

  const handleSendMessage = () => {
    if (newMessage) {
      window.electron.store.addMessage(newMessage, openedChat?.id);
      forceRerender();
      setMessageList(
        window.electron.store.get(`${MessagesKey}_${openedChat?.id}`)
      );
      setNewMessage('');
    }
  };

  return (
    <section className={styles.sidebar}>
      <ChatList
        chats={window.electron.store.get(chatKey)}
        chatMessages={messageList}
        setOpenedChat={setOpenedChat}
        messageList={messageList}
      />
      {openedChat && (
        <Dialog
          handleSendMessage={handleSendMessage}
          chat={openedChat}
          setNewMessage={setNewMessage}
          newMessage={newMessage}
          messageList={messageList}
        />
      )}
      <button
        className={styles['add-chat-button']}
        type="button"
        onClick={handleAddChatButton}
      >
        <img src={NewMessageIcon} alt="new-message-icon" />
      </button>
    </section>
  );
}

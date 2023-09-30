import { useState } from 'react';
import styles from './chat.module.scss';
import NewMessageIcon from '../../../../assets/icons/NewMessageIcon.svg';
import { getRandomNumber } from '../../utils';
import { ChatList } from '../../components';
import chatKey from './constants';
import Dialog from '../../components/Dialog/Dialog';
import { ChatData } from '../../components/ChatItem/interfaces';
import Avatar from '../../../../assets/images/avatar.png';
import { useElectronStore } from '../../hooks/ElectronStoreContext';

export default function ChatScreen() {
  const [openedChat, setOpenedChat] = useState<ChatData>();
  const [newMessage, setNewMessage] = useState<string>('');
  const { forceRerender } = useElectronStore();

  const handleAddChatButton = () => {
    const chatData = {
      id: getRandomNumber(),
      name: 'Darryl',
      messages: [],
      avatar: Avatar,
    };
    window.electron.store.addChat(chatData);
    setOpenedChat(chatData);
  };

  const handleSendMessage = () => {
    window.electron.store.addMessage(newMessage, openedChat?.id);
    forceRerender();
  };

  return (
    <section className={styles.sidebar}>
      <ChatList
        chats={window.electron.store.get(chatKey)}
        setOpenedChat={setOpenedChat}
      />
      {openedChat && (
        <Dialog
          handleSendMessage={handleSendMessage}
          chat={openedChat}
          setNewMessage={setNewMessage}
          newMessage={newMessage}
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

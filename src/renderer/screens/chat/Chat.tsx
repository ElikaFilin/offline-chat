import { useEffect, useState } from 'react';
import styles from './chat.module.scss';
import NewMessageIcon from '../../../../assets/icons/new-message-icon.svg';
import { getRandomChatData, getRandomNumber } from '../../utils';
import { ChatList } from '../../components';
import chatKey from './constants';
import Dialog from '../../components/Dialog/Dialog';
import { ChatData } from '../../components/ChatItem/interfaces';
import { useElectronStore } from '../../hooks/ElectronStoreContext';
import Avatar from '../../../../assets/images/avatar.png';

export default function ChatScreen() {
  const [openedChat, setOpenedChat] = useState<ChatData>(null);
  const [newMessage, setNewMessage] = useState<string>('');
  const { forceRerender } = useElectronStore();

  const handleAddChatButton = async () => {
    const chatData = await getRandomChatData();
    window.electron.store.addChat(chatData);
    setOpenedChat(chatData);
    setNewMessage('');
  };

  const handleSendMessage = () => {
    if (newMessage) {
      window.electron.store.addMessage(newMessage, openedChat?.id);
      const chatElement = window.electron.store
        .get(chatKey)
        .find((chat) => chat.id === openedChat.id);
      setOpenedChat(chatElement);
      forceRerender();
      setNewMessage('');
    }
  };

  useEffect(() => {
    if (!window.electron.store.get(chatKey).length) {
      const chatData = {
        id: getRandomNumber(),
        name: 'Darryl',
        avatar: Avatar,
      };
      window.electron.store.addChat(chatData);
      setOpenedChat(chatData);
      setNewMessage('');
    }
  }, []);

  return (
    <section className={styles.sidebar}>
      <ChatList
        chats={window.electron.store.get(chatKey)}
        setOpenedChat={setOpenedChat}
        openedChat={openedChat}
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

import { useState } from 'react';
import styles from './chat.module.scss';
import NewMessageIcon from '../../../../assets/icons/NewMessageIcon.svg';
import { getRandomNumber } from '../../utils';
import { ChatList } from '../../components';
import chatKey from './constants';
import Conversation from '../../components/conversation/Conversation';
import { ChatData } from '../../components/ChatItem/interfaces';
import Avatar from '../../../../assets/images/avatar.png';

export default function ChatScreen() {
  const [openedChat, setOpenedChat] = useState<ChatData>();

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

  return (
    <section className={styles.sidebar}>
      <ChatList
        chats={window.electron.store.get(chatKey)}
        setOpenedChat={setOpenedChat}
      />
      {openedChat && <Conversation chat={openedChat} />}
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

import moment from 'moment';
import { Props } from './interfaces';
import styles from './chat-item.module.scss';
import useTranslate from '../../hooks/useTranslate';

export default function ChatItem({ chat, onClick, openedChat }: Props) {
  const t = useTranslate();
  const lastMessage = chat?.messages?.length
    ? chat.messages[chat.messages.length - 1].text
    : t('No messages');

  return (
    <button
      className={`${styles.wrapper} ${
        openedChat?.id === chat.id ? styles['selected-chat'] : ''
      }`}
      onClick={onClick}
      type="button"
    >
      <img src={chat.avatar} alt="avatar" />
      <div className={styles['text-box']}>
        <div className={styles.name}>{chat.name}</div>
        <div className={styles['last-message']}>{lastMessage}</div>
        {chat?.messages?.length && (
          <time className={styles.time}>
            {moment(chat?.messages[chat.messages.length - 1].createdAt).format(
              'LT'
            )}
          </time>
        )}
      </div>
    </button>
  );
}

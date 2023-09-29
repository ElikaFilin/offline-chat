import { Props } from './interfaces';
import styles from './chat-item.module.scss';
import useTranslate from '../../hooks/useTranslate';

export default function ChatItem({ chat, onClick }: Props) {
  const t = useTranslate();
  const isEmptyMessages = !!chat.messages.length;
  const lastMessage = isEmptyMessages
    ? chat.messages[chat.messages.length - 1].text
    : t('Click to write new message');

  return (
    <button className={styles.wrapper} onClick={onClick} type="button">
      <img src={chat.avatar} alt="avatar" />
      <div className={styles['text-box']}>
        <span className={styles.name}>{chat.name}</span>
        <span className={styles['last-message']}>{lastMessage}</span>
        {isEmptyMessages && (
          <span>{chat.messages[chat.messages.length - 1].createdAt}</span>
        )}
      </div>
    </button>
  );
}

import moment from 'moment';
import { Props } from './interfaces';
import styles from './chat-item.module.scss';
import useTranslate from '../../hooks/useTranslate';

export default function ChatItem({ chat, onClick, messageList }: Props) {
  const t = useTranslate();
  const isEmptyMessages = !!messageList.length;
  const lastMessage = isEmptyMessages
    ? messageList[messageList.length - 1].text
    : t('No messages');

  return (
    <button className={styles.wrapper} onClick={onClick} type="button">
      <img src={chat.avatar} alt="avatar" />
      <div className={styles['text-box']}>
        <div className={styles.name}>{chat.name}</div>
        <div className={styles['last-message']}>{lastMessage}</div>
        {isEmptyMessages && (
          <span className={styles.time}>
            {moment(messageList[messageList.length - 1].createdAt).format('LT')}
          </span>
        )}
      </div>
    </button>
  );
}

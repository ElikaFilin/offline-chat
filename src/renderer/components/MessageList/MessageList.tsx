import moment from 'moment';
import { useRef } from 'react';
import RightMessageTail from '../../../../assets/images/right-message-tail.svg';
import LeftMessageTail from '../../../../assets/images/left-message-tail.svg';
import SeenMessageIcon from '../../../../assets/icons/seen-message-icon.svg';
import { Props } from './interfaces';
import styles from './message-list.module.scss';

export default function MessageList({ messageList, newMessage }: Props) {
  const messageListRef = useRef<HTMLDivElement | null>(null);

  const userData = window.electron.store.get('userData');
  const isMessageBelongsToLoggedUser = (senderId) => senderId === userData.id;
  const getMessageContainerClassName = (isUserMessage: boolean) =>
    isUserMessage ? 'message-container-user' : 'message-container-interlocutor';
  const getTailClassName = (isUserMessage: boolean) =>
    isUserMessage ? 'tail-right' : 'tail-left';
  const getTailImage = (isUserMessage: boolean) =>
    isUserMessage ? RightMessageTail : LeftMessageTail;

  if (!newMessage && messageListRef.current) {
    window.requestAnimationFrame(() =>
      messageListRef.current.scrollTo(
        messageListRef.current.scrollWidth,
        messageListRef.current.scrollHeight
      )
    );
  }

  return (
    <div className={styles.wrapper} ref={messageListRef}>
      {messageList?.map((message) => {
        const isUserMessage = isMessageBelongsToLoggedUser(message.senderId);
        return (
          <div
            className={styles[getMessageContainerClassName(isUserMessage)]}
            key={message.id}
          >
            {message.text}
            <time className={styles.time}>
              {moment(message.createdAt).format('LT')}
              {isUserMessage && message.seen && (
                <img src={SeenMessageIcon} alt="seen" />
              )}
            </time>
            <img
              className={styles[getTailClassName(isUserMessage)]}
              src={getTailImage(isUserMessage)}
              alt="tail"
            />
          </div>
        );
      })}
    </div>
  );
}

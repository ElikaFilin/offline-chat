import { ChangeEvent } from 'react';
import { Props } from './interfaces';
import styles from './dialog.module.scss';
import { Button, Input } from '../common';
import ArrowUp from '../../../../assets/icons/arrow-up.svg';
import useTranslate from '../../hooks/useTranslate';
import MessageList from '../MessageList/MessageList';

export default function Dialog({
  chat,
  setNewMessage,
  newMessage,
  handleSendMessage,
}: Props) {
  const t = useTranslate();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  return (
    <section className={styles.wrapper}>
      <header className={styles['top-header']}>
        <img src={chat.avatar} alt="avatar" />
        <span>{chat.name}</span>
      </header>
      <MessageList messageList={chat?.messages} newMessage={newMessage} />
      <div className={styles['input-wrapper']}>
        <Input
          customClassNames="conversation-input"
          placeholder={t('Message')}
          onChange={handleOnChange}
          value={newMessage}
          onSubmit={handleSendMessage}
        />
        <Button
          onClick={handleSendMessage}
          icon={ArrowUp}
          buttonClassNames="send-message-button"
        />
      </div>
    </section>
  );
}

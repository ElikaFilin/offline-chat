import { ChangeEvent, useState } from 'react';
import { Props } from './interfaces';
import styles from './conversation.module.scss';
import { Button, Input } from '../common';
import ArrowUp from '../../../../assets/icons/ArrowUp.svg';
import useTranslate from '../../hooks/useTranslate';

export default function Conversation({ chat }: Props) {
  const t = useTranslate();
  const [newMessage, setNewMessage] = useState<string>('');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };
  const handleSendMessage = () => {
    window.electron.store.addMessage(newMessage, chat.id);
  };
  return (
    <section className={styles.wrapper}>
      <header className={styles['top-header']}>
        <img src={chat.avatar} alt="avatar" />
        <span>{chat.name}</span>
      </header>
      <div className={styles['input-wrapper']}>
        <Input
          customClassNames="conversation-input"
          placeholder={t('Message')}
          onChange={handleOnChange}
          value={newMessage}
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

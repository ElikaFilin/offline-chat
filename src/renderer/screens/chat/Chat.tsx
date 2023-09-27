import styles from './chat.module.scss';
import NewMessageIcon from '../../../../assets/icons/NewMessageIcon.svg';

export default function Chat() {
  return (
    <section className={styles.sidebar}>
      <button className={styles['add-chat-button']} type="button">
        <img src={NewMessageIcon} alt="new-message-icon" />
      </button>
    </section>
  );
}

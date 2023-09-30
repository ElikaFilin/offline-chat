import styles from './message-list.module.scss';
import RightMessageTail from '../../../../assets/images/right-message-tail.svg';
import LeftMessageTail from '../../../../assets/images/left-message-tail.svg';

export default function MessageList() {
  return (
    <div className={styles.wrapper}>
      <div className={styles['message-container-user']}>
        I saw the most recent scam is the ads on Facebook selling seafood at a
        cheap price
        <img src={RightMessageTail} alt="tail" />
      </div>

      <div className={styles['message-container-interlocutor']}>
        but I think mostly they targeting parents cos my friend’s mother got
        scammed 20k
        <img src={LeftMessageTail} alt="tail" />
      </div>
    </div>
  );
}

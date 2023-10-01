import toast from 'react-hot-toast';
import Store from 'electron-store';
import { Message } from '../components/ChatItem/interfaces';

export default function getCustomClassNames(classNames, stylesObj) {
  return classNames.map((name) => stylesObj[name]);
}

export function getFormattedPhoneNumber(value: string) {
  const arr = [];
  for (let i = 0; i <= value.length - 1; i += 3) {
    if (i <= 3) {
      arr.push(value.slice(i, i + 3));
    } else {
      arr.push(value.slice(i, value.length));
      break;
    }
  }
  return arr.join('-');
}

export function authenticate(response, userData) {
  if (response && response.token) {
    window.electron.store.set('userData', userData);
    localStorage.setItem('auth_token', response.token);
    return true;
  }
  toast.error("Authentication token doesn't exist");
  return false;
}

export function getRandomNumber() {
  return Math.floor(Math.random() * 10e9);
}

export function getSenderId(
  store: Store,
  messages: Message[] | undefined,
  chatId: number
) {
  const userData = store.get('userData');
  if (!messages) return userData.id;
  if (messages.length % 2 !== 0) {
    return chatId;
  }
  return userData.id;
}

import toast from 'react-hot-toast';
import Store from 'electron-store';
import { Message } from '../components/ChatItem/interfaces';
import config from '../config';

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

async function randomAPIRequest(url: string) {
  try {
    const response = await fetch(`${config.RANDOM_API_HOST}/${url}`);
    const json = await response.json();
    if (!response.ok) {
      toast.error(`${json}`);
      return { error: json };
    }
    return json;
  } catch (error) {
    toast.error(`${error}`);
    return { error };
  }
}

export async function getRandomChatData() {
  const { results } = await randomAPIRequest('api');
  return {
    id: getRandomNumber(),
    name: results[0]?.name?.first,
    avatar: results[0]?.picture?.thumbnail,
  };
}

import { ipcMain } from 'electron';
import Store from 'electron-store';
import chatKey, { MessagesKey } from '../renderer/screens/chat/constants';
import { getRandomNumber, getSenderId } from '../renderer/utils';

const store = new Store();

/** store listeners */
ipcMain.on('electron-store-get', (event, value) => {
  event.returnValue = store.get(value);
});

ipcMain.on('electron-store-set', (event, key, value) => {
  store.set(key, value);
});

ipcMain.on('electron-store-add-message', (event, value, chatId) => {
  const messageKey = `${MessagesKey}_${chatId}`;
  const messages = store.get(messageKey);
  const message = {
    id: getRandomNumber(),
    text: value,
    createdAt: new Date(),
    senderId: getSenderId(store, messages, chatId),
    seen: true, // todo - to change seen property dynamically need to implement online chat, not offline
  };

  if (!messages) store.set(messageKey, [message]);
  else store.set(messageKey, [...messages, message]);
});

ipcMain.on('electron-store-add-chat', (event, value) => {
  const chats = store.get(chatKey);
  const duplicate = chats.find((chat) => chat.id === value.id);
  if (duplicate) return;
  chats.push(value);
  store.set(chatKey, chats);
});

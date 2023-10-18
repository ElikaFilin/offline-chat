import { ipcMain } from 'electron';
import Store from 'electron-store';
import chatKey from '../renderer/screens/chat/constants';
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
  function getMessage(messages) {
    return {
      id: getRandomNumber(),
      text: value,
      createdAt: new Date(),
      senderId: getSenderId(store, messages, chatId),
      seen: true, // todo - to change seen property dynamically need to implement online chat, not offline
    };
  }

  const chats = store.get(chatKey);
  const chatWithMessages = chats.map((chat) => {
    if (chat.id === chatId && !chat.messages) {
      return { ...chat, messages: [getMessage([])] };
    }
    if (chat.id === chatId) {
      return {
        ...chat,
        messages: [...chat.messages, getMessage(chat.messages)],
      };
    }
    return chat;
  });
  store.set(chatKey, chatWithMessages);
});

ipcMain.on('electron-store-add-chat', (event, value) => {
  const chats = store.get(chatKey);
  const duplicate = chats.find((chat) => chat.id === value.id);
  if (duplicate) return;
  chats.push(value);
  store.set(chatKey, chats);
});

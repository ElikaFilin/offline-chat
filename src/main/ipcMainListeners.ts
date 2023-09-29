import { ipcMain } from 'electron';
import Store from 'electron-store';
import chatKey from '../renderer/screens/chat/constants';
import { getRandomNumber, getSenderId } from '../renderer/utils';

/** show the template of ipc listeners */
ipcMain.on('ipc-example', async (event) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  event.reply('ipc-example', msgTemplate('pong'));
});

const store = new Store();

/** store listeners */
ipcMain.on('electron-store-get', async (event, value) => {
  event.returnValue = store.get(value);
});
ipcMain.on('electron-store-set', async (event, key, value) => {
  store.set(key, value);
});
ipcMain.on('electron-store-add-message', async (event, value, id) => {
  const chats = store.get(chatKey);
  const chat = chats.find((item) => item.id === id);
  const message = {
    id: getRandomNumber(),
    text: value,
    createdAt: new Date(),
    senderId: getSenderId(store, chat),
    seen: true, // to change seen property dynamically need to implement online chat, not offline
  };
  chat.messages.push(message);
  store.set(chatKey, chats);
});
ipcMain.on('electron-store-add-chat', async (event, value) => {
  const chats = store.get(chatKey);
  const duplicate = chats.find((chat) => chat.id === value.id);
  if (duplicate) return;
  chats.push(value);
  store.set(chatKey, chats);
});
ipcMain.on('electron-store-set-object', async (event, obj) => {
  store.set(obj);
});
ipcMain.on('electron-store-has', async (event, key) => {
  store.set(key);
});

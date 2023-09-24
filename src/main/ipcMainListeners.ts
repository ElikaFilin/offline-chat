import { ipcMain } from 'electron';
import Store from 'electron-store';

/** show the template of ipc listeners */
ipcMain.on('ipc-example', async (event) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  event.reply('ipc-example', msgTemplate('pong'));
});

const store = new Store();

/** store listeners */
ipcMain.on('electron-store-get', async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on('electron-store-set', async (event, key, val) => {
  store.set(key, val);
});
ipcMain.on('electron-store-set-object', async (event, obj) => {
  store.set(obj);
});
ipcMain.on('electron-store-has', async (event, key) => {
  store.set(key);
});

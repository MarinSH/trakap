import { dialog, ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
import Store from 'electron-store';
import { fileLoad } from '../utils/file';

export function ipcDirectory() {
    const store = new Store();

    ipcMain.handle('check-directory', async () => {
        try {
            const storedDirectoryPath = store.get('dataPath', null);

            if (!storedDirectoryPath) {
                return null;
            }

            const dataFilePath = path.join(path.dirname(storedDirectoryPath), 'trakap-data.json');

            if (fs.existsSync(dataFilePath)) {
                return storedDirectoryPath;
            } else {
                store.delete('dataPath');
                return null;
            }
        } catch (error) {
            console.error('Error in check-directory-offers:', error);
            throw error;
        }
    });

    ipcMain.handle('select-directory', async () => {
        try {
            const result = await dialog.showOpenDialog({
                properties: ['openDirectory'],
            });
    
            if (result.canceled) {
                return null;
            }
    
            const selectedDirectory = result.filePaths[0];
            const trakapDirectory = path.join(selectedDirectory, 'Trakap');
            const newDataPath = path.join(trakapDirectory, 'trakap-data.json');
    
            if (!fs.existsSync(trakapDirectory)) {
                fs.mkdirSync(trakapDirectory);
            }
    
            if (!fs.existsSync(newDataPath)) {
                fs.writeFileSync(newDataPath, JSON.stringify({ offers: [] }, null, 2));
            }
    
            store.set('dataPath', newDataPath);
            return newDataPath;
        } catch (error) {
            console.error('Error in select-directory-offers:', error);
            throw error;
        }
    });

    ipcMain.handle('read-directory', async () => {
        try {
            return fileLoad();
        } catch (error) {
            console.error('Error in read-directory IPC:', error);
            throw error;
        }
    });

    ipcMain.handle('reset-directory', async () => {
        try {
            const currentDataPath = store.get('dataPath');
            if (!currentDataPath) {
                throw new Error('No directory path found to reset.');
            }
    
            const result = await dialog.showOpenDialog({
                properties: ['openDirectory'],
            });
    
            if (result.canceled) {
                return;
            }
    
            const newDirectory = result.filePaths[0];
            const trakapDirectory = path.join(newDirectory, 'Trakap');
            const newDataPath = path.join(trakapDirectory, 'trakap-data.json');
    
            if (fs.existsSync(newDataPath)) {
                store.set('dataPath', newDataPath);
                return;
            }
    
            if (!fs.existsSync(trakapDirectory)) {
                fs.mkdirSync(trakapDirectory);
            }
    
            if (fs.existsSync(currentDataPath)) {
                const currentFilePath = path.join(path.dirname(currentDataPath), 'trakap-data.json');
                fs.renameSync(currentFilePath, newDataPath);
            }
    
            store.set('dataPath', newDataPath);
    
            const oldTrakapDirectory = path.dirname(currentDataPath);
            if (fs.existsSync(oldTrakapDirectory) && fs.readdirSync(oldTrakapDirectory).length === 0) {
                fs.rmdirSync(oldTrakapDirectory);
            }
        } catch (error) {
            console.error('Error in reset-directory-offers:', error);
            throw error;
        }
    }); 
}
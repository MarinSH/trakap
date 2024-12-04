import { dialog, ipcMain } from 'electron';
import { jsonLoad, jsonSave } from "../utils/json";
import fs from 'fs';
import path from 'path';
import Store from 'electron-store';
import { v4 as uuidv4 } from 'uuid';

export function ipcLoader() {
    const store = new Store();

    ipcMain.handle('check-directory-offers', async () => {
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

    ipcMain.handle('select-directory-offers', async () => {
        try {
            const result = await dialog.showOpenDialog({
                properties: ['openDirectory'],
            });

            if (result.canceled) {
                return null;
            }

            const selectedDirectory = result.filePaths[0];
            const newDataPath = path.join(selectedDirectory, 'trakap-data.json');

            store.set('dataPath', newDataPath);

            if (!fs.existsSync(newDataPath)) {
                fs.writeFileSync(newDataPath, JSON.stringify({ offers: [] }, null, 2));
            }

            return newDataPath;
        } catch (error) {
            console.error('Error in directory-offers:', error);
            throw error;
        }
    });

    ipcMain.handle('get-directory-offers', () => {
        try {
            return store.get('dataPath', null);
        } catch (error) {
            console.error('Error in get-directory-offers:', error);
            throw error;
        }
    });

    ipcMain.handle('reset-directory-offers', async () => {
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
            const newDataPath = path.join(newDirectory, 'trakap-data.json');

            if (fs.existsSync(currentDataPath)) {
                const currentFilePath = path.join(path.dirname(currentDataPath), 'trakap-data.json');
                
                if (fs.existsSync(newDataPath)) {
                    throw new Error('Data file already exists in the new directory.');
                }

                fs.renameSync(currentFilePath, newDataPath);
            }

            store.set('dataPath', newDataPath);
        } catch (error) {
            console.error('Error in reset-directory-offers:', error);
            throw error;
        }
    });

    ipcMain.handle('get-offers', () => {
        try {
            const data = jsonLoad();
            return data.offers;
        } catch (error) {
            console.error('Error in get-offers:', error);
            throw error;
        }
    });

    ipcMain.handle('get-offer-by-id', (event, offerId) => {
        try {
            const data = jsonLoad();
            const offer = data.offers.find(offer => offer.id === offerId);

            if (!offer) {
                throw new Error(`Offer with ID ${offerId} not found.`);
            }

            return offer;
        } catch (error) {
            console.error('Error in get-offer-by-id:', error);
            throw error;
        }
    });

    ipcMain.handle('add-offer', (event, offer) => {
        try {
            const data = jsonLoad();

            if (!offer.id) {
                offer.id = uuidv4();
            }

            data.offers.push(offer);
            jsonSave(data);
            return offer;
        } catch (error) {
            console.error('Error in add-offer:', error);
            throw error;
        }
    });

    ipcMain.handle('update-offer', (event, updatedOffer) => {
        try {
            const data = jsonLoad();
            const index = data.offers.findIndex(offer => offer.id === updatedOffer.id);

            if (index === -1) {
                throw new Error(`Offer with ID ${updatedOffer.id} not found.`);
            }

            data.offers[index] = updatedOffer;
            jsonSave(data);
            return updatedOffer;
        } catch (error) {
            console.error('Error in update-offer:', error);
            throw error;
        }
    });

    ipcMain.handle('delete-offer', (event, offerId) => {
        try {
            const data = jsonLoad();
            const index = data.offers.findIndex(offer => offer.id === offerId);

            if (index === -1) {
                throw new Error(`Offer with ID ${offerId} not found.`);
            }

            const deletedOffer = data.offers.splice(index, 1);
            jsonSave(data);
            return deletedOffer[0];
        } catch (error) {
            console.error('Error in delete-offer:', error);
            throw error;
        }
    });
}

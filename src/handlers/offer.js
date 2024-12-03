import { dialog, ipcMain } from 'electron';
import { jsonLoad, jsonSave } from "../utils/json";
import fs from 'fs';
import path from 'path';
import Store from 'electron-store';
import { v4 as uuidv4 } from 'uuid';

export function ipcLoader() {
    const store = new Store();
    
    ipcMain.handle('directory-offers', async () => {
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
    });

    ipcMain.handle('get-directory-offers', () => {
        return store.get('dataPath', null);
    });

    ipcMain.handle('reset-directory-offers', () => {
        store.delete('dataPath');
    });

    ipcMain.handle('get-offers', () => {
        const data = jsonLoad();
        return data.offers;
    });

    ipcMain.handle('add-offer', (event, offer) => {
        const data = jsonLoad();

        if (!offer.id) {
            offer.id = uuidv4();
        }

        data.offers.push(offer);
        jsonSave(data);
        return offer;
    });

    ipcMain.handle('update-offer', (event, updatedOffer) => {
        const data = jsonLoad();
        const index = data.offers.findIndex(offer => offer.id === updatedOffer.id);
        if (index !== -1) {
            data.offers[index] = updatedOffer;
            jsonSave(data);
            return updatedOffer;
        }
        return null;
    });

    ipcMain.handle('delete-offer', (event, offerId) => {
        const data = jsonLoad();
        const index = data.offers.findIndex(offer => offer.id === offerId);
        if (index !== -1) {
            const deletedOffer = data.offers.splice(index, 1);
            jsonSave(data);
            return deletedOffer[0];
        }
        return null;
    });
}

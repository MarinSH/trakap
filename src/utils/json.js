import fs from 'fs';
import Store from 'electron-store';

export function jsonLoad() {
    const store = new Store();
    const dataPath = store.get('dataPath');

    if (!dataPath) {
        return { offers: [] };
    }

    try {
        const data = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error when loading data:', error);
        return { offers: [] };
    }
}

export function jsonSave(data) {
    const store = new Store();
    const dataPath = store.get('dataPath');
    
    if (!dataPath) {
        console.error('No dataPath set, cannot save data.');
        return;
    }

    try {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error when saving data :', error);
    }
}

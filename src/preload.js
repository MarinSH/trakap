import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('api', {
    directoryOffers: () => ipcRenderer.invoke('directory-offers'),
    getDirectoryOffers: () => ipcRenderer.invoke('get-directory-offers'),
    resetDirectoryOffers: () => ipcRenderer.invoke('reset-directory-offers'),
    getOffers: () => ipcRenderer.invoke('get-offers'),
    addOffer: (offer) => ipcRenderer.invoke('add-offer', offer),
    updateOffer: (updatedOffer) => ipcRenderer.invoke('update-offer', updatedOffer),
    deleteOffer: (offerId) => ipcRenderer.invoke('delete-offer', offerId)
});
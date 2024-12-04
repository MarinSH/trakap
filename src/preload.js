import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('api', {
    checkDirectory: () => ipcRenderer.invoke('check-directory'),
    selectDirectory: () => ipcRenderer.invoke('select-directory'),
    resetDirectory: () => ipcRenderer.invoke('reset-directory'),
    
    getOffers: () => ipcRenderer.invoke('get-offers'),
    getOfferById: (offerId) => ipcRenderer.invoke('get-offer-by-id', offerId),
    addOffer: (offer) => ipcRenderer.invoke('add-offer', offer),
    updateOffer: (updatedOffer) => ipcRenderer.invoke('update-offer', updatedOffer),
    deleteOffer: (offerId) => ipcRenderer.invoke('delete-offer', offerId)
});
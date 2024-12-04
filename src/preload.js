import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('api', {
    checkDirectoryOffers: () => ipcRenderer.invoke('check-directory-offers'),
    selectDirectoryOffers: () => ipcRenderer.invoke('select-directory-offers'),
    getDirectoryOffers: () => ipcRenderer.invoke('get-directory-offers'),
    resetDirectoryOffers: () => ipcRenderer.invoke('reset-directory-offers'),
    getOffers: () => ipcRenderer.invoke('get-offers'),
    getOfferById: (offerId) => ipcRenderer.invoke('get-offer-by-id', offerId),
    addOffer: (offer) => ipcRenderer.invoke('add-offer', offer),
    updateOffer: (updatedOffer) => ipcRenderer.invoke('update-offer', updatedOffer),
    deleteOffer: (offerId) => ipcRenderer.invoke('delete-offer', offerId)
});
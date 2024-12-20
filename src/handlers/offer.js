import { ipcMain } from 'electron';
import { fileLoad, fileSave } from "../utils/file";
import { v4 as uuidv4 } from 'uuid';

export function ipcOffer() {
    ipcMain.handle('get-offers', async () => {
        try {
            const data = fileLoad();
            return data.offers;
        } catch (error) {
            console.error('Error in get-offers:', error);
            throw error;
        }
    });

    ipcMain.handle('get-offer-by-id', async (event, offerId) => {
        try {
            const data = fileLoad();
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

    ipcMain.handle('add-offer', async (event, offerData) => {
        try {
          const data = fileLoad();
          let offer = { ...offerData };
      
          if (offer.image) {
            const base64Data = offer.image.replace(/^data:image\/\w+;base64,/, '');
            offer.imageData = base64Data;
            delete offer.image;
          }
      
          if (!offer.id) {
            offer.id = uuidv4();
          }
      
          offer = { id: offer.id, ...offer };
      
          data.offers.push(offer);
          fileSave(data);
      
          return offer;
        } catch (error) {
          console.error('Error in add-offer:', error);
          throw error;
        }
    });

    ipcMain.handle('update-offer', async (event, updatedOffer) => {
        try {
            const data = fileLoad();
            const index = data.offers.findIndex(offer => offer.id === updatedOffer.id);
    
            if (index === -1) {
                throw new Error(`Offer with ID ${updatedOffer.id} not found.`);
            }

            data.offers[index] = { ...data.offers[index], ...updatedOffer };
            fileSave(data);
            return updatedOffer;
        } catch (error) {
            console.error('Error in update-offer:', error);
            throw error;
        }
    });

    ipcMain.handle('delete-offer', async (event, offerId) => {
        try {
            const data = fileLoad();
            const index = data.offers.findIndex(offer => offer.id === offerId);

            if (index === -1) {
                throw new Error(`Offer with ID ${offerId} not found.`);
            }

            const deletedOffer = data.offers.splice(index, 1);
            fileSave(data);
            return deletedOffer[0];
        } catch (error) {
            console.error('Error in delete-offer:', error);
            throw error;
        }
    });
}

import { request } from '../utility/request'; 

const inventoryService = {
  getInventory: () => {
    return request.get('/inventory') 
      .then((data) => {
        return data; 
      })
      .catch((err) => {
        console.error('Error fetching inventory:', err);
        throw err; 
      });
  },

};

export default inventoryService;

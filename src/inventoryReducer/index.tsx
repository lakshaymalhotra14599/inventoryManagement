import { v4 as uuidv4 } from 'uuid';
import { SET_LOADING, SET_ERROR, SET_DATA, SET_DIALOG_OPEN, SET_DIALOG_CLOSE, UPDATE_PRODUCT, SET_USER, UPDATE_ROLES, DELETE_PRODUCT, DISBALE_PRODUCT } from './constants';

// Define Role Types
export type RoleType = 'ADMIN' | 'USER'; 

// Permission Type
export type Permission = 'ADD' | 'DELETE' | 'HIDE' | 'VIEW';

// Role Interface
export interface Role {
  name: RoleType;          
  permissions: Permission[];
}

export interface User {
  id: string;
  name: string;
  role: RoleType;           
}

export interface InventoryState {
  data: InventoryItem[];
  loading: boolean;
  error: string | null;
  dialogOpen: boolean;
  selectedProduct: InventoryItem | null;
  totalStoreValue: number;
  outOfStock: number;
  categories: number;
  disabledIds: Set<string>; 
}

// User and Roles State Interface
export interface State {
  currentUser: User;
  roles: Role[];
  inventory: InventoryState;
}

export interface InventoryItem {
  name: string;
  category: string;
  value: string;
  quantity: number; 
  price: string;
  id?: string;
}

// Action Type
export type Action =
  | { type: typeof SET_USER; payload: User }
  | { type: typeof UPDATE_ROLES; payload: Role[] }
  | { type: typeof SET_DATA; payload: InventoryItem[] }
  | { type: typeof SET_LOADING; payload: boolean }
  | { type: typeof SET_ERROR; payload: string | null }
  | { type: typeof SET_DIALOG_OPEN; payload: InventoryItem }
  | { type: typeof SET_DIALOG_CLOSE }
  | { type: typeof UPDATE_PRODUCT; payload: InventoryItem }
  | { type: typeof DELETE_PRODUCT; payload: string | undefined } 
  | { type: typeof DISBALE_PRODUCT; payload: string | undefined }
  | { type: 'RESET_STATE' };

// Initial State
export const initialState: State = {
  currentUser: {
    id: "1",
    name: "Default",
    role: "ADMIN",
  },
  roles: [
    { name: 'ADMIN', permissions: [ 'DELETE', 'HIDE', 'VIEW'] },
    { name: 'USER', permissions: [ 'VIEW'] },
  ],
  inventory: {
    data: [],
    loading: false,
    error: null,
    dialogOpen: false,
    selectedProduct: null,
    totalStoreValue: 0,
    outOfStock: 0,
    categories: 0,
    disabledIds: new Set(),
  },
};

// Reducer Function
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_USER:
      return { ...state, currentUser: action.payload };
    case UPDATE_ROLES:
      return { ...state, roles: action.payload };
    case SET_DATA: {
        // Use the helper function to recalculate inventory metrics
        const dataWithIds = action.payload.map((item) => ({
          ...item,
          id: uuidv4()
        }));
        
        const { totalStoreValue, outOfStock, categories } = recalculateInventoryMetrics(dataWithIds , state.inventory.disabledIds);
  
        return {
          ...state,
          inventory: {
            ...state.inventory,
            data: dataWithIds,
            loading: false,
            error: null,
            totalStoreValue,
            outOfStock,
            categories,
          },
        };
      }
    case SET_LOADING:
      return { ...state, inventory: { ...state.inventory, loading: action.payload } };
    case SET_ERROR:
      return { ...state, inventory: { ...state.inventory, error: action.payload, loading: false } };
    case SET_DIALOG_OPEN:
      return {
        ...state,
        inventory: {
          ...state.inventory,
          dialogOpen: true,
          selectedProduct: action.payload,
        },
      };
    case SET_DIALOG_CLOSE:
      return {
        ...state,
        inventory: {
          ...state.inventory,
          dialogOpen: false,
          selectedProduct: null,
        },
      };
    case UPDATE_PRODUCT: {
        const updatedData = state.inventory.data.map((item) =>
          { // @ts-expect-error err
            return item.id === action.payload.id ? { ...item, ...action.payload, id: uuidv4() , quantity : parseInt(action.payload.quantity , 10) } : item}
        );
        const { totalStoreValue, outOfStock, categories } = recalculateInventoryMetrics(updatedData , state.inventory.disabledIds);
  
        if (JSON.stringify(updatedData) !== JSON.stringify(state.inventory.data)) {
          return {
            ...state,
            inventory: {
              ...state.inventory,
              data: updatedData,
              totalStoreValue,
              outOfStock,
              categories,
              selectedProduct: null,
              dialogOpen: false,
            },
          };
        }
  
        return state;
      }  
      case DELETE_PRODUCT: {
        const filteredData = state.inventory.data.filter(
          (item) => item.id !== action.payload
        );
      
        const { totalStoreValue, outOfStock, categories } = recalculateInventoryMetrics(filteredData ,  state.inventory.disabledIds);
      
        return {
          ...state,
          inventory: {
            ...state.inventory,
            data: filteredData,
            totalStoreValue,
            outOfStock,
            categories,
          },
        };
      }
      case DISBALE_PRODUCT: {
        const disabledIds = new Set(state.inventory.disabledIds);
      
        if (action.payload && typeof action.payload === 'string') {
          if (disabledIds.has(action.payload)) {
            disabledIds.delete(action.payload);
          } else {
            disabledIds.add(action.payload);
          }
      
          const updatedData = state.inventory.data.map((item) =>
            item.id === action.payload
              ? { ...item, disabled: action.payload && disabledIds.has(action.payload) }
              : item
          );
      
          const { totalStoreValue, outOfStock, categories } = recalculateInventoryMetrics(updatedData, disabledIds);
      
          return {
            ...state,
            inventory: {
              ...state.inventory,
              data: updatedData,
              totalStoreValue,
              outOfStock,
              categories,
              disabledIds,
            },
          };
        }
      
        return state; 
      }
      
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
};


// Helper function to recalculate totals, outOfStock, and categories
const recalculateInventoryMetrics = (data: InventoryItem[], disabledIds: Set<string>) => {
  let totalStoreValue = 0;
  let outOfStock = 0;
  const categorySet = new Set<string>();

  const activeItems = data.filter(item => item.id && !disabledIds.has(item.id));


  activeItems.forEach((item) => {
    const price = parseFloat(item.value.replace('$', '').replace(',', ''));
    totalStoreValue += price;

    if (item.quantity === 0) {
      outOfStock += 1;
    }

    categorySet.add(item.category);
  });

  const categories = categorySet.size;

  return { totalStoreValue, outOfStock, categories };
};


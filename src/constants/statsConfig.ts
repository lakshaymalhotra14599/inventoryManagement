import { ReactNode } from 'react';

export interface CardData {
  text: string;
  value: (data: string | number) => string | number; 
  icon?: ReactNode;
  className?: string;
  key: string;
  lookupKey: string;
}

export const cardData: CardData[] = [
  {
    text: 'Total Products',
    value: (data) => Array.isArray(data) ? data.length : 0, 
    key: 'total-products',
    lookupKey: 'data',
  },
  {
    text: 'Total Store Value',
    value: (data) => `${data}`, 
    key: 'total-store-value',
    lookupKey: 'totalStoreValue',
  },
  {
    text: 'Out of Stock',
    value: (data) => !isNaN(Number(data)) ? parseInt(String(data), 10) : 0, 
    key: 'out-of-stock',
    lookupKey: 'outOfStock',
  },
  {
    text: 'Categories',
    value: (data) => data || 'N/A', 
    key: 'categories',
    lookupKey: 'categories',
  },
];

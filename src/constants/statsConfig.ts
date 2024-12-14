import { ReactNode } from 'react';

export interface CardData {
  text: string;
  value: (data: any) => string | number;
  icon?: ReactNode;
  className?: string;
  key: string;
  lookupKey: string; 
}

export const cardData: CardData[] = [
  {
    text: 'Total Products',
    value: (data) => data.length,
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
    value: (data) => parseInt(data , 10),
    key: 'out-of-stock',
    lookupKey: 'outOfStock', 
  },
  {
    text: 'Categories',
    value: (data) => data,
    key: 'categories',
    lookupKey: 'categories', 
  },
];

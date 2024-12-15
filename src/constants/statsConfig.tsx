import { ReactNode } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CategoryIcon from '@mui/icons-material/Category';

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
    value: (data) => (Array.isArray(data) ? data.length : 0),
    key: 'total-products',
    lookupKey: 'data',
    icon: <ShoppingCartIcon color="primary" />,
  },
  {
    text: 'Total Store Value',
    value: (data) => `${data}`,
    key: 'total-store-value',
    lookupKey: 'totalStoreValue',
    icon: <MonetizationOnIcon color="secondary" />,
  },
  {
    text: 'Out of Stock',
    value: (data) => (!isNaN(Number(data)) ? parseInt(String(data), 10) : 0),
    key: 'out-of-stock',
    lookupKey: 'outOfStock',
    icon: <RemoveShoppingCartIcon color="error" />,
  },
  {
    text: 'Categories',
    value: (data) => data || 'N/A',
    key: 'categories',
    lookupKey: 'categories',
    icon: <CategoryIcon color="success" />,
  },
];

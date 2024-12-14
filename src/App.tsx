import React from 'react';
import { RoleProvider } from './inventoryContext/index';
import InventoryManagement from './components/InventoryManagement';
import HeaderBar from './components/headerBar';

const App: React.FC = () => {
  return (
    <RoleProvider>
      <HeaderBar/>
      <h1>Inventory Stats</h1>
      <InventoryManagement />
    </RoleProvider>
  );
};

export default App;

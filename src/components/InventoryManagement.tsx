import React, { useEffect } from 'react';

// Context
import { useRoleContext } from "../hooks/useRoleContext"

// Constants
import { SET_LOADING, SET_ERROR, SET_DATA, SET_DIALOG_CLOSE, UPDATE_PRODUCT } from '../inventoryReducer/constants';
import { inventoryColumnConfig } from '../constants/columnConfig';

// Service
import inventoryService from '../services/inventoryService';

// HOC
import withRoleBasedActions from './table/withRoleBasedActoins';

// Component
import BaseTable from './table';
import StatsCards from './statsCard';
import ProductEditDialog from './ProductEditDailog';
import { InventoryItem } from '../inventoryReducer';

const RoleBasedTable = withRoleBasedActions(BaseTable);

const InventoryManagement: React.FC = () => {
  const { state, dispatch } = useRoleContext();
  const { data  , loading} = state.inventory 

  useEffect(() => {
    const fetchData = async () => {
      if (data.length === 0) { 
        dispatch({ type: SET_LOADING, payload: true });
        try {
          const data = await inventoryService.getInventory();
          dispatch({ type: SET_DATA, payload: data });
        } catch (error : unknown) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          dispatch({ type: SET_ERROR, payload: errorMessage });
        } finally {
          dispatch({ type: SET_LOADING, payload: false });
        }
      }
    };

    fetchData();
  }, [data, dispatch]); 


  const handleDialogClose = () => {
    dispatch({ type: SET_DIALOG_CLOSE });
  };

  const handleSaveProduct = (updatedProduct: InventoryItem) => {
    dispatch({ type: UPDATE_PRODUCT, payload: updatedProduct });
  };

  return (
    <div>
      <StatsCards/>
      <RoleBasedTable 
        data={data} 
        role={state.currentUser.role} 
        columns={inventoryColumnConfig} 
        loading={loading} 
        dispatch={dispatch} 
        // disbaledIds={state.inventory.disabledIds}
        />
      <ProductEditDialog
        onClose={handleDialogClose}
        onSave={handleSaveProduct}
      />

    </div>
  );
};

export default InventoryManagement;

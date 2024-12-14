import React, { useEffect, useMemo } from 'react';

// Context
import { useRoleContext } from "../hooks/useRoleContext"

// Constants
import { SET_LOADING, SET_ERROR, SET_DATA, SET_DIALOG_OPEN, SET_DIALOG_CLOSE, UPDATE_PRODUCT } from '../inventoryReducer/constants';
import { inventoryColumnConfig } from '../constants/columnConfig';

// Service
import inventoryService from '../services/inventoryService';

// HOC
import withRoleBasedActions from './table/withRoleBasedActoins';

// Component
import BaseTable from './table';
import StatsCards from './statsCard';
import ProductEditDialog from './ProductEditDailog';

const RoleBasedTable = withRoleBasedActions(BaseTable);

const InventoryManagement: React.FC = () => {
  const { state, dispatch } = useRoleContext();
  const { data  , loading} = state.inventory 
//   const dataWithUniqueIds = useMemo(() => {
//     return data.map((item, index) => ({
//       ...item,
//       id: index, 
//     }));
//   }, [data]); 

  useEffect(() => {
    const fetchData = async () => {
      if (data.length === 0) { 
        dispatch({ type: SET_LOADING, payload: true });
        try {
          const data = await inventoryService.getInventory();
          dispatch({ type: SET_DATA, payload: data });
        } catch (error) {
          dispatch({ type: SET_ERROR, payload: error.message });
        } finally {
          dispatch({ type: SET_LOADING, payload: false });
        }
      }
    };

    fetchData();
  }, [data, dispatch]); // Ensure the effect is only triggered when necessary

  const handleRowClick = (row: any) => {
    console.log("row clicked")
    dispatch({ type: SET_DIALOG_OPEN, payload: row });
  };

  const handleDialogClose = () => {
    dispatch({ type: SET_DIALOG_CLOSE });
  };

  const handleSaveProduct = (updatedProduct: any) => {
    console.log("on save " , updatedProduct)
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
        onRowClick={(params : any) => handleRowClick(params.row)}
        dispatch={dispatch} 
        />
      <ProductEditDialog
        onClose={handleDialogClose}
        onSave={handleSaveProduct}
      />

    </div>
  );
};

export default InventoryManagement;

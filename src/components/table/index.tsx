import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { InventoryItem } from '../../inventoryReducer';

const BaseTable: React.FC<{ 
  data: InventoryItem[]; 
  columns: GridColDef[]; 
  loading: boolean; 
}> = ({ data, columns, loading }) => {  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid 
        rows={data} 
        columns={columns} 
        loading={loading} 
        paginationModel={{ page: 0, pageSize: data.length}} 
      />
    </div>
  );
};

export default BaseTable;

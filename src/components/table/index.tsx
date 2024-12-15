import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { GridCellParams } from '@mui/x-data-grid'
import { InventoryItem } from '../../inventoryReducer';

const BaseTable: React.FC<{ 
  data: InventoryItem[]; 
  columns: GridColDef[]; 
  loading: boolean; 
  disabledIds : Set<string>
}> = ({ data, columns, loading , disabledIds }) => {  

    const getCellClassName = (params: GridCellParams) => {
        if (params.field === 'actions') {
          return ''; 
        }
      
        if (disabledIds.has(params.row.id)) {
          return 'disableCol'; 
        }
      
        return '';
      };
      
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid 
        rows={data} 
        columns={columns} 
        loading={loading} 
        paginationModel={{ page: 0, pageSize: data.length}} 
        getCellClassName={getCellClassName}
      />
    </div>
  );
};

export default BaseTable;

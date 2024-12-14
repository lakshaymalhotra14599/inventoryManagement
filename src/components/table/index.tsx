import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const BaseTable: React.FC<{ 
  data: any[]; 
  columns: any[]; 
  loading: boolean; 
  onRowClick: (params: any) => void; 
}> = ({ data, columns, loading, onRowClick }) => {  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid 
        rows={data} 
        columns={columns} 
        loading={loading} 
        onRowClick={onRowClick}  
      />
    </div>
  );
};

export default BaseTable;

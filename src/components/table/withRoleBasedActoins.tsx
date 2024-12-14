import React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';

// Reducer
import { RoleType } from '../../inventoryReducer';
import { SET_DIALOG_OPEN } from '../../inventoryReducer/constants';

const withRoleBasedActions = (WrappedComponent: React.FC<any>) => {
  return (props: { 
    role: RoleType; 
    data: any[]; 
    columns: any[]; 
    loading: boolean; 
    onRowClick?: (row: any) => void;
    dispatch: React.Dispatch<any>; 
  }) => {
    const { role, data, columns, loading, dispatch } = props;

    // const handleRowClick = (row: any) => {
    //   if (onRowClick) {
    //     onRowClick(row);
    //   }
    // };

    const handleEditClick = (row: any) => {
      console.log("Edit clicked for row:", row);
      dispatch({ type: SET_DIALOG_OPEN, payload: row });  
    };

    const getActionsForRole = (row: any) => {
      const isDisabled = role === 'USER';

      return (
        <>
          <IconButton
            disabled={isDisabled}
            onClick={() => { console.log(row); return !isDisabled && handleEditClick(row); }}
            style={{ marginRight: '0.5rem' }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            disabled={isDisabled}
            onClick={() => !isDisabled && alert(`Disable ${row.name}`)}
            style={{ marginRight: '0.5rem' }}
          >
            <BlockIcon />
          </IconButton>
          <IconButton
            disabled={isDisabled}
            onClick={() => !isDisabled && alert(`Delete ${row.name}`)}
            style={{ marginRight: '0.5rem' }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      );
    };

    const roleBasedColumns = [
      ...columns,
      {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        renderCell: (params: any) => getActionsForRole(params.row),
      },
    ];

    return (
      <WrappedComponent 
        data={data} 
        columns={roleBasedColumns} 
        loading={loading} 
        // onRowClick={handleRowClick}  
      />
    );
  };
};

export default withRoleBasedActions;

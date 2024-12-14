import React from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

// Icon
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';

// Types
import { Action, InventoryItem, RoleType } from '../../inventoryReducer';

// Constants
import { SET_DIALOG_OPEN } from '../../inventoryReducer/constants';


interface WithRoleBasedActionsProps {
  role: RoleType;
  data: InventoryItem[];
  columns: GridColDef[];
  loading: boolean;
  dispatch: React.Dispatch<Action>;
}

const withRoleBasedActions = (
  WrappedComponent: React.FC<{ data: InventoryItem[]; columns: GridColDef[]; loading: boolean }>
) => {
  return (props: WithRoleBasedActionsProps) => {
    const { role, data, columns, loading, dispatch } = props;

    const handleEditClick = (row: InventoryItem) => {
      console.log('Edit clicked for row:', row);
      dispatch({ type: SET_DIALOG_OPEN, payload: row });
    };

    const getActionsForRole = (row: InventoryItem) => {
      const isDisabled = role === 'USER';

      return (
        <>
          <IconButton
            disabled={isDisabled}
            onClick={() => {
              return !isDisabled && handleEditClick(row);
            }}
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

    const roleBasedColumns: GridColDef[] = [
      ...columns,
      {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        renderCell: (params: GridRenderCellParams<InventoryItem>) => getActionsForRole(params.row),
      },
    ];

    return <WrappedComponent data={data} columns={roleBasedColumns} loading={loading} />;
  };
};

export default withRoleBasedActions;

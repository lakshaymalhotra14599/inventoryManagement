import React from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

// Icon
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// Types
import { Action, InventoryItem, RoleType } from '../../inventoryReducer';

// Constants
import { DELETE_PRODUCT, DISBALE_PRODUCT, SET_DIALOG_OPEN } from '../../inventoryReducer/constants';

import Tooltip from '@mui/material/Tooltip';

// Material-UI theme hook
import { useTheme } from '@mui/material/styles';

interface WithRoleBasedActionsProps {
  role: RoleType;
  data: InventoryItem[];
  columns: GridColDef[];
  loading: boolean;
  dispatch: React.Dispatch<Action>;
  disabledIds: Set<string>;
}

const withRoleBasedActions = (
  WrappedComponent: React.FC<{ data: InventoryItem[]; columns: GridColDef[]; loading: boolean; disabledIds: Set<string> }>
) => {
  return (props: WithRoleBasedActionsProps) => {
    const { role, data, columns, loading, dispatch, disabledIds } = props;
    const theme = useTheme();

    const handleEditClick = (row: InventoryItem) => {
      dispatch({ type: SET_DIALOG_OPEN, payload: row });
    };

    const handleDeleteClick = (row: InventoryItem) => {
      dispatch({ type: DELETE_PRODUCT, payload: row.id });
    };

    const handleDisableClick = (row: InventoryItem) => {
      dispatch({ type: DISBALE_PRODUCT, payload: row.id });
    };

    const getActionsForRole = (row: InventoryItem) => {
      const isDisabled = role === 'USER';
      const isEditDisabled = isDisabled || (row.id && disabledIds.has(row.id) ? true : false);

      return (
        <>
          <Tooltip title="Edit" arrow>
            <IconButton
              disabled={isEditDisabled}
              onClick={() => {
                return !isEditDisabled && handleEditClick(row);
              }}
              style={{
                marginRight: '0.5rem',
                color: isEditDisabled ? 'gray' : theme.palette.primary.main,
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={isDisabled || (row.id && disabledIds.has(row.id)) ? "Unhide" : "Hide"} arrow>
            <IconButton
              disabled={isDisabled}
              onClick={() => !isDisabled && handleDisableClick(row)}
              style={{
                marginRight: '0.5rem',
                color: isDisabled || (row.id && disabledIds.has(row.id)) ? 'gray' : 'green', 
              }}
            >
              {isDisabled || (row.id && disabledIds.has(row.id)) ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete" arrow>
            <IconButton
              disabled={isDisabled}
              onClick={() => !isDisabled && handleDeleteClick(row)}
              style={{
                marginRight: '0.5rem',
                color: isDisabled ? 'gray' : 'red', // Red for Delete
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
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

    return <WrappedComponent data={data} columns={roleBasedColumns} loading={loading} disabledIds={disabledIds} />;
  };
};

export default withRoleBasedActions;

import { Permission, State } from "../inventoryReducer";

export const hasPermission = (state: State, permission: Permission): boolean => {
    const { currentUser, roles } = state;
    if (!currentUser) return false;
  
    const role = roles.find((r) => r.name === currentUser.role);
    return role ? role.permissions.includes(permission) : false;
  };
  
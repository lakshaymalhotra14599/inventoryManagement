import { useContext } from "react";
import RoleContext from '../inventoryContext/index'; 

export const useRoleContext = () => {
    const context = useContext(RoleContext);
    if (!context) {
      throw new Error('useRoleContext must be used within a RoleProvider');
    }
    return context;
  };
  
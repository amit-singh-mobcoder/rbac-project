import React, { useContext } from "react";
import { RoleContext } from "../context/Role";

const AdminRoute = ({ children }) => {
  const { userRole } = useContext(RoleContext);
  
  if(userRole !== 'admin'){
    return <div>access denied, only admin can access this route</div>
  }
  return children;
};

export default AdminRoute;

import React, { ReactNode } from "react";
import AdminMainPage from "./admin/page";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
         <AdminMainPage />
      {children}
    </div>
  );
};

export default AdminLayout;
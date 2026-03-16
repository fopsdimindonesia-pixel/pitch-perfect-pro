import React, { createContext, useContext, useState } from "react";
import type { Role } from "@/lib/mockData";

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  tenantName: string;
}

const RoleContext = createContext<RoleContextType>({
  role: "owner",
  setRole: () => {},
  tenantName: "Platform Admin",
});

const tenantNames: Record<Role, string> = {
  owner: "Platform Admin",
  eo: "PSSI Makassar",
  club: "SSB Garuda Muda",
  admin: "System Administrator",
};

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<Role>("owner");

  return (
    <RoleContext.Provider value={{ role, setRole, tenantName: tenantNames[role] }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);

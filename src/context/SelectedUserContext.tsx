import React, { createContext, useState } from "react";

interface UserData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

interface ContextProps {
    selectedUser: UserData;
    setSelectedUser: React.Dispatch<React.SetStateAction<UserData>>;
}

export const UserDataContext = createContext<ContextProps>({
    selectedUser: { id: 0, firstName: "", lastName: "", email: "", phone: "" },
    setSelectedUser: () => { },
});
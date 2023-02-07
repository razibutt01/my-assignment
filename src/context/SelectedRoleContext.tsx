import React, { createContext, useState } from "react";

type UserData = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

interface ContextProps {
    selectedAssignUser: UserData;
    setSelectedAssignUser: React.Dispatch<React.SetStateAction<UserData>>;
    selectedUnassignUser: UserData[];
    setSelectedUnassignUser: React.Dispatch<React.SetStateAction<UserData[]>>;
}

export const RoleDataContext = createContext<ContextProps>({
    selectedAssignUser: { id: 0, firstName: "", lastName: "", email: "", phone: "" },
    setSelectedAssignUser: () => { },
    selectedUnassignUser: [{ id: 0, firstName: "", lastName: "", email: "", phone: "" }],
    setSelectedUnassignUser: () => { },
});
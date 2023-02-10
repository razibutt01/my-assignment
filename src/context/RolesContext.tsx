import React from 'react'

const initialState = {
    roles: [],
}
type RoleType = {
    id: number;
    title: string;
    active: string;
    description: string;


}
type InitialStateType = {
    roles: RoleType[];

}
export const RolesContext = React.createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null,
})
export const rolesReducer = (state: InitialStateType, action: any) => {
    switch (action.type) {
        case 'SET_ROLES':
            return {
                ...state, roles: action.payload
            }
        case 'CREATE_ROLES':
            return { ...state, roles: [...state.roles, action.payload] };
        default:
            return state
    }
}

export const RolesContextProvider = (props: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer(rolesReducer, initialState)
    const value = { state, dispatch };
    return (
        <RolesContext.Provider value={value}>
            {props.children}
        </RolesContext.Provider>
    )
}
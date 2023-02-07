import React from 'react'

const initialState = {
    users: [],
}
type UserType = {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    phone: string
}
type InitialStateType = {
    users: UserType[];

}
export const UsersContext = React.createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null,
})
export const usersReducer = (state: InitialStateType, action: any) => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state, users: action.payload
            }
        case 'CREATE_USERS':
            return { ...state, users: [...state.users, action.payload] };
        case 'DELETE_USERS':
            return {
                ...state, users: state.users.filter((u: UserType) => u.id !== action.payload.id)
            }
        case "UPDATE_USER":
            return {
                ...state, users: state.users.map(user =>
                    user.id === action.payload.id
                        ? { ...user, ...action.payload.updateData }
                        : user
                )
            }
        default:
            return state
    }
}

export const UsersContextProvider = (props: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer(usersReducer, initialState)
    const value = { state, dispatch };
    return (
        <UsersContext.Provider value={value}>
            {props.children}
        </UsersContext.Provider>
    )
}
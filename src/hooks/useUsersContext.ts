import { UsersContext } from '../context/UsersContext'
import React from 'react'

export const useUsersContext = () => {
    const context = React.useContext(UsersContext)
    if (!context) {
        throw Error('useUsersContext must be used inside an useUsersContext')
    }

    return context
}
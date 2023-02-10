import { RolesContext } from '../context/RolesContext'
import React from 'react'

export const useRolesContext = () => {
    const context = React.useContext(RolesContext)
    if (!context) {
        throw Error('useUsersContext must be used inside an useUsersContext')
    }

    return context
}
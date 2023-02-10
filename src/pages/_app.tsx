import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppProps } from 'next/app';
import NavBar from '@/components/NavBar';
import { UsersContextProvider } from '../context/UsersContext'
import { RolesContextProvider } from '../context/RolesContext'
import { UserDataContext } from '@/context/SelectedUserContext';
import { RoleDataContext } from '@/context/SelectedRoleContext';

type UserType = {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  phone: string
}
export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const [selectedUser, setSelectedUser] = React.useState<UserType>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });
  const [selectedAssignUser, setSelectedAssignUser] = React.useState<UserType>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });
  const [selectedUnassignUser, setSelectedUnassignUser] = React.useState<UserType[]>([{
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  }]);
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <RolesContextProvider>
        <UsersContextProvider>
          <RoleDataContext.Provider value={{ selectedAssignUser, setSelectedAssignUser, selectedUnassignUser, setSelectedUnassignUser }}>
            <UserDataContext.Provider value={{ selectedUser, setSelectedUser }}>

              <NavBar />
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Component {...pageProps} />
            </UserDataContext.Provider>
          </RoleDataContext.Provider>
        </UsersContextProvider>
      </RolesContextProvider>
    </React.Fragment>
  );
}
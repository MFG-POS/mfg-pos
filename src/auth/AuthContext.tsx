import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { auth } from 'api/firebase/firebase.api';
import { User, UserCredential } from 'api/firebase/firebase.types';
import { getSingle } from 'api/firebase/firestore/firestore-actions';
import { UserDetails } from 'model/auth/user-details';

type AuthProviderProps = {
  readonly children: ReactNode;
};

type ContextProps = {
  currentUser: User | null | undefined;
  currentUserDetails: UserDetails | null | undefined;
  isAdmin: boolean;
  isUnclassified: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<ContextProps>({} as ContextProps);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [currentUserDetails, setCurrentUserDetails] = useState<UserDetails | null>();
  const [loading, setLoading] = useState<boolean>(true);

  const signup = (email: string, password: string): Promise<UserCredential> =>
    auth.createUserWithEmailAndPassword(email, password);

  const login = (email: string, password: string): Promise<UserCredential> =>
    auth.signInWithEmailAndPassword(email, password);

  const logout = (): Promise<void> => auth.signOut();

  const isAdmin: boolean = currentUserDetails?.role === 'ADMIN';

  const isUnclassified: boolean = currentUserDetails?.role === 'UNCLASSIFIED';

  useEffect(
    () =>
      auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        if (user)
          getSingle<UserDetails>('users', user.uid!).then((details) => {
            setCurrentUserDetails(details);
            setLoading(false);
          });
        else setLoading(false);
      }),
    [],
  );

  const value = {
    currentUser,
    currentUserDetails,
    login,
    signup,
    logout,
    isAdmin,
    isUnclassified,
  } as ContextProps;

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

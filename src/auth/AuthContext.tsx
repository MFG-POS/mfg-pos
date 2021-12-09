import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from 'api/firebase/firebase.api';
import { User, UserCredential } from 'api/firebase/firebase.types';
import { getSingle } from 'api/firebase/firestore/firestore-actions';
import { UserDetails } from 'model/auth/user-details';

type AuthProviderProps = {
  readonly children: React.ReactNode;
};

type ContextProps = {
  currentUser: User | null | undefined;
  currentUserDetails: UserDetails | null | undefined;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void> | undefined;
  updatePassword: (password: string) => Promise<void> | undefined;
};

const AuthContext = createContext<ContextProps>({} as ContextProps);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [currentUserDetails, setCurrentUserDetails] = useState<UserDetails | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const signup = (email: string, password: string): Promise<UserCredential> =>
    auth.createUserWithEmailAndPassword(email, password);

  const login = (email: string, password: string): Promise<UserCredential> =>
    auth.signInWithEmailAndPassword(email, password);

  const logout = (): Promise<void> => auth.signOut();

  const resetPassword = (email: string): Promise<void> => auth.sendPasswordResetEmail(email);

  const updateEmail = (email: string): Promise<void> | undefined => currentUser?.updateEmail(email);

  const updatePassword = (password: string): Promise<void> | undefined => currentUser?.updatePassword(password);

  useEffect(
    () =>
      auth.onAuthStateChanged((user) =>
        getSingle<UserDetails>('users', user?.uid!).then((details) => {
          setCurrentUserDetails(details);
          setIsAdmin(currentUserDetails?.role === 'ADMIN');
          setCurrentUser(user);
          setLoading(false);
        }),
      ),
    [],
  );

  const value = {
    currentUser,
    currentUserDetails,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    isAdmin,
  } as ContextProps;

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

import { useCallback, createContext, useMemo } from 'react';

const AuthContext = createContext<{ signIn: any; signOut: any; signUp: any }>({
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
});
export { AuthContext };

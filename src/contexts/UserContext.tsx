import API from "@/api";
import LoadingComponent from "@/components/LoadingComponent";
import IUser from "@/interfaces/IUser";
import React, { useContext, createContext, useEffect } from "react";

interface IUserContext {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const UserContext = createContext<IUserContext>({
  loading: false,
  setLoading: () => {},
  user: null,
  setUser: () => {},
  error: null,
  setError: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<IUser | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const api = new API();
        const result = await api.refreshToken();

        const user = result.user as IUser;
        user["api"] = api;
        user["access_token"] = result.accessToken;
        setUser(user);
        setLoading(false);
        console.log("Logged in as", user.username);
        setTimeout(refreshToken, 15 * 60 * 1000);
      } catch (err) {
        console.log("Could not refresh token", err);
        setLoading(false);
      }
    };
    refreshToken();
  }, []);

  return loading ? (
    <LoadingComponent />
  ) : (
    <UserContext.Provider
      value={{ loading, setLoading, user, setUser, error, setError }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export default UserContext;

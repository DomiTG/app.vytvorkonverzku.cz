import API from "@/api";
import IUser from "@/interfaces/IUser";
import React, { useContext, createContext, useEffect } from "react";

interface IUserContext {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const UserContext = createContext<IUserContext>({
  loading: false,
  setLoading: () => {},
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<IUser | null>(null);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const api = new API();
        const data = await api.refreshToken();
        if (data.success) {
          const user = data.user as IUser;
          const accessToken = data.accessToken;
          if (!user || !accessToken) {
            throw new Error("Invalid response");
          }
          user.access_token = accessToken;
          user.api = api;

          setUser(user);

          setTimeout(
            () => {
              refreshToken();
            },
            15 * 60 * 1000,
          );
        }
      } catch (err) {
        console.error(`Could not refresh token: ${err}`);
      }
    };
    refreshToken();
  }, []);

  return (
    <UserContext.Provider value={{ loading, setLoading, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

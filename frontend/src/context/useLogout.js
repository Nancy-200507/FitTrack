import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { logout: logoutContext } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("user");
    logoutContext();
  };

  return { logout };
};
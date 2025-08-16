/**
 * @author Luka Baturić
 * @date 16/08/2025
 */

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface IReturn {
   roles: string[] | null;
   loading: boolean;
   isAuthenticated: boolean;
   handleLogin: () => void;
   handleLogout: () => void;
}

const useRoles = (): IReturn => {
   const { i18n } = useTranslation();
   const [roles, setRoles] = useState<string[] | null>(null);
   const [loading, setLoading] = useState(true);
   const { isAuthenticated, loginWithRedirect, logout, getIdTokenClaims } =
      useAuth0();

   useEffect(() => {
      const fetchRoles = async () => {
         const claims = await getIdTokenClaims();
         const fetchedRoles =
            claims?.["https://library-app.com/roles"] || [];
         setRoles(fetchedRoles);
         setLoading(false);
      };

      fetchRoles();
   }, [isAuthenticated, getIdTokenClaims]);

   const handleLogout = () => {
      console.log("handleLogout");
      logout({ logoutParams: { returnTo: window.location.origin } });
   };

   const handleLogin = () => {
      loginWithRedirect({ authorizationParams: { ui_locales: i18n.language } });
      window.location.assign("/");
   };

   console.log("isAuthenticated: ", isAuthenticated);

   return {
      roles,
      loading,
      isAuthenticated,
      handleLogin,
      handleLogout,
   };
};

export { useRoles };

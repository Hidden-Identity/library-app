/**
 * @author Luka Baturić
 * @date 15/08/2025
 */

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LoginRedirect = () => {
  const { i18n } = useTranslation();
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect({ authorizationParams: { ui_locales: i18n.language } });
    window.location.assign("/");
  }, [i18n.language, loginWithRedirect]);

  return null;
};

export { LoginRedirect };
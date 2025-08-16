/**
 * @author Luka Baturić
 * @date 15/08/2025
 */

import { Route, useHistory } from 'react-router-dom';
import { auth0Config } from '../../lib/auth0Config';
import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';
import { ComponentType, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

const Auth0ProviderWithHistory = ({ children }: { children: ReactNode }) => {
   const { i18n } = useTranslation();
   const history = useHistory();

   const onRedirectCallback = (appState: any) => {
      history.push(appState?.returnTo || "/home");
   };

   return (
      <Auth0Provider
         domain={auth0Config.issuer}
         clientId={auth0Config.clientId}
         authorizationParams={{
            redirect_uri: auth0Config.redirectUri,
            audience: auth0Config.audience,
            scope: auth0Config.scope,
            ui_locales: i18n.language
         }}
         onRedirectCallback={onRedirectCallback}
      >
         {children}
      </Auth0Provider>
   );
};

const SecureRoute = ({ component, path, ...args }: { component: ComponentType<any>, path: string }) => (
   <Route path={path} component={withAuthenticationRequired(component)} {...args} />
);

export {Auth0ProviderWithHistory, SecureRoute};
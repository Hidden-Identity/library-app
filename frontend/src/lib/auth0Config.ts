/**
 * @author Luka Baturić
 * @date 15/08/2025
 */

const auth0Config = {
   clientId: "RIfiubFlJS7hJvskCCH4vGubaCy9Dy3V",
   issuer: "dev-0bkh3l7xvoy21at4.eu.auth0.com",
   audience: "http://localhost:8080",
   redirectUri: window.location.origin + "/callback",
   scope: "openid profile email",
};

export { auth0Config };

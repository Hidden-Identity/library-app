/**
 * @author Luka Baturić
 * @date 15/08/2025
 */

const auth0Config = {
   clientId: "i9X8PefHi9T5vD5jyKTNh3UIvtmHZEQJ",
   issuer: "dev-w3ucylxkjmvrgmf0.us.auth0.com",
   audience: "http://localhost:8080",
   redirectUri: window.location.origin + "/callback",
   scope: "openid profile email",
};

export { auth0Config };

export const URL = "http://127.0.0.1:8000";
export const CONFIG = {
"apiUrl": URL
}
export const environment = {
    production: false,
    auth: {
      domain:"dev-hzf3gl655z7ry503.uk.auth0.com",
      clientId:"apcDn1uLfz2wSIpndsKqTsuOi3bOhN8j",
      redirectUri: window.location.origin,
    },
    dev: {
      serverUrl:"localhost:8080",
    },
};
// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import * as msal from '@azure/msal-browser';

// Note: local storage works on Chromium but not on Firefox if "Delete cookies and site data when Firefox is closed" is
// selected (for more details, see https://bugzilla.mozilla.org/show_bug.cgi?id=1453699)
const writeToStorage = (key, value) => localStorage.setItem(key, value);
const readFromStorage = (key) => localStorage.getItem(key);
const clearFromStorage = (key) => localStorage.removeItem(key);

export const name = 'auth-keycloakRedirect';
const authData = {
  accountId: undefined,
  userEmail: undefined,
  username: undefined,
  userId: undefined,
  roles: [],
};
let config = null;
let msalApp = null;

export const setConfig = async (newConfig) => {
  config = newConfig;
  msalApp = new msal.PublicClientApplication(config.msalConfig);
  await msalApp.initialize();
};

const checkInit = () => {
  if (msalApp === null) {
    console.error(
      'AuthKeycloakRedirect module has not been initialized. Make sure you ' +
        'call the setConfig function when you add the AuthKeycloakRedirect provider.'
    );
    return false;
  }
  return true;
};

const getActiveAccountFromMSAL = () => {
  const accountId = readFromStorage('authAccountId');
  if (!accountId) {
    return;
  }
  const allAccounts = msalApp.getAllAccounts();
  if (!allAccounts.length === 0) {
    console.warn('WARNING: no accounts found, please log in');
    return;
  }

  const account = allAccounts.find((account) => account.homeAccountId === accountId);
  if (account === undefined) {
    console.warn(`WARNING: no account found with id "${accountId}", cannot retrieve account`);
    return;
  }

  return account;
};

const redirectOnAuthSuccess = () => {
  window.location.href = config?.msalConfig?.auth?.redirectUri ?? '/';
};

const _acquireTokensByRequestAndAccount = async (tokenReq, account) => {
  if (!tokenReq) {
    console.warn('No token request provided');
    tokenReq = {};
  }

  tokenReq.account = account;
  return await msalApp
    .acquireTokenSilent(tokenReq)
    .then((tokenRes) => tokenRes)
    .catch((silentTokenFetchError) => {
      if (silentTokenFetchError.errorCode === 'no_tokens_found') {
        // No token found during acquireTokenSilent, ignore this error, nothing to do
        return;
      } else if (silentTokenFetchError.errorCode === 'login_required') {
        console.warn(
          'Silent authentication not possible, user is not logged in. This usually happens when the user session ' +
            'has expired. Please try to log in again.'
        );
        return;
      } else if (silentTokenFetchError.errorMessage?.indexOf('interaction_required') !== -1) {
        msalApp
          .acquireTokenRedirect(tokenReq)
          .then((tokenRes) => tokenRes) // Token acquired with interaction
          .catch((tokenRedirectError) => console.error(tokenRedirectError));
      }
      throw silentTokenFetchError;
    });
};

// When forceRefresh is set to true, existing tokens in browser storage are ignored and new tokens are retrieved with
// a silent request
export const acquireTokens = async (forceRefresh = false) => {
  if (!checkInit()) return;

  if (!forceRefresh && readFromStorage('authAuthenticated') === 'true') {
    const idToken = readFromStorage('authIdToken');
    const accessToken = readFromStorage('authAccessToken');
    return { accessToken, idToken };
  }

  const account = getActiveAccountFromMSAL();
  if (account === undefined) return;

  const tokens = await _acquireTokensByRequestAndAccount(config.accessRequest, account);
  _updateTokensInStorage(tokens);
  return tokens;
};

const handleResponse = (response) => {
  if (response != null) {
    const account = response.account;
    _updateTokensInStorage(response);
    writeToStorage('authIdTokenPopup', response.idToken);
    writeToStorage('authAuthenticated', 'true');
    writeToStorage('authAccountId', account.homeAccountId);
    writeToStorage('authEmail', account.idTokenClaims?.email);
    authData.accountId = account.homeAccountId;
    authData.userEmail = account.idTokenClaims?.email;
    authData.username = account.name;
    authData.userId = account.localAccountId;

    redirectOnAuthSuccess();
    return;
  }

  msalApp.loginRedirect(config.loginRequest);
};

export const signIn = () => {
  if (!checkInit()) return;

  // Set auth provider name in storage to declare that it has an interaction in progress
  setTimeout(() => {
    writeToStorage('authInteractionInProgress', name);
  }, 50);
  return msalApp.handleRedirectPromise().then(handleResponse);
};

export const signOut = () => {
  if (!checkInit()) return;

  const accountId = readFromStorage('authAccountId');
  const idToken = readFromStorage('authIdToken');

  clearFromStorage('authIdTokenPopup');
  clearFromStorage('authIdToken');
  clearFromStorage('authAccessToken');
  clearFromStorage('authAccountId');
  clearFromStorage('authEmail');
  writeToStorage('authAuthenticated', 'false');

  const logoutRequest = {
    account: msalApp.getAccountByHomeId(authData.accountId ?? accountId),
    idTokenHint: idToken,
  };
  msalApp.logoutRedirect(logoutRequest);
};

// Returns a boolean value, stating whether the isUserSignedIn must be provided a callback
export const isAsync = () => {
  return false;
};

const _updateTokensInStorage = (tokens) => {
  if (tokens?.idToken) writeToStorage('authIdToken', tokens.idToken);
  if (tokens?.accessToken) {
    writeToStorage('authAccessToken', tokens.accessToken);
    authData.roles = _extractRolesFromAccessToken(tokens.accessToken);
  }
};

const _extractRolesFromAccessToken = (accessToken) => {
  if (!accessToken) return [];

  const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
  // The exact key to use may depend from keycloak client & Cosmo Tech API configuration (c.f. the value of
  // csm.platform.authorization.roles-jwt-claim in your k8s tenant secrets)
  const rolesTokenAttribute = config?.rolesJwtClaim;
  if (rolesTokenAttribute) {
    if (decodedToken?.[rolesTokenAttribute]) return decodedToken?.[rolesTokenAttribute];
    console.warn(
      `Authentication provider configuration defined rolesJwtClaim="${rolesTokenAttribute}" ` +
        'but this key was not found in the access token. Please check your webapp and API configuration.'
    );
  }

  if (decodedToken?.roles) return decodedToken.roles; // Legacy default key in token

  if (decodedToken?.userRoles) {
    console.warn(
      "DEPRECATED: the token claim for API roles was automatically found in 'userRoles', but the lookup " +
        'for this specific key will be removed in a future version. Please update your webapp configuration to ' +
        "explicitly set AUTH_KEYCLOAK_ROLES_JWT_CLAIM to 'userRoles'."
    );
    return decodedToken.userRoles;
  }

  console.warn("Couldn't extract roles from access token. Please check your webapp and API configuration.");
  return [];
};

export const isUserSignedIn = async () => {
  if (readFromStorage('authAuthenticated') === 'true') {
    // Restore roles from access token if necessary (roles in auhtData may be lost after login redirection)
    if (authData.roles.length === 0) {
      const accessToken = readFromStorage('authAccessToken');
      if (accessToken) authData.roles = _extractRolesFromAccessToken(accessToken);
    }
    return true;
  }

  try {
    // Resume interaction if one is already in progress
    if (readFromStorage('authInteractionInProgress') === name) {
      clearFromStorage('authInteractionInProgress');

      const locationHashParameters = new URLSearchParams(window.location.hash.substring(1));
      if (locationHashParameters.has('state')) {
        if (locationHashParameters.has('iss', config?.msalConfig?.auth?.authorityMetadata?.issuer)) {
          msalApp.handleRedirectPromise().then(handleResponse); // Resume redirect workflow process
        } else if (locationHashParameters.has('iss')) {
          const configIssuer = config?.msalConfig?.auth?.authorityMetadata?.issuer;
          const urlIssuer = locationHashParameters.get('iss');
          console.warn(`Issuer found in url "${urlIssuer}" does not match keycloak configuration: "${configIssuer}"`);
        }
      }
    }

    // Otherwise, try to acquire a token silently to implement SSO
    const tokens = await acquireTokens();
    _updateTokensInStorage(tokens);
    if (tokens?.accessToken !== undefined) return true;
  } catch (e) {
    console.error(e);
  }
  return false;
};

export const refreshTokens = async () => {
  const tokens = await acquireTokens(true);
  _updateTokensInStorage(tokens);
  return tokens;
};

export const getUserEmail = () => {
  if (!checkInit()) return;

  const account = getActiveAccountFromMSAL();
  // Note: account data from MSAL seems to contain user email in the 'username' property
  return readFromStorage('authEmail') ?? authData?.userEmail ?? account?.username;
};

export const getUserName = () => {
  if (!checkInit()) return;
  return authData?.name ?? getActiveAccountFromMSAL()?.name;
};

export const getUserId = () => {
  if (!checkInit()) return;
  return authData?.userId ?? getActiveAccountFromMSAL()?.localAccountId;
};

export const getUserRoles = () => {
  if (!checkInit()) return;
  return authData.roles;
};

export const getUserPicUrl = () => {
  return undefined;
};

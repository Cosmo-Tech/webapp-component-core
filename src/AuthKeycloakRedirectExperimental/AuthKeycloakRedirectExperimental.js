// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import * as msal from '@azure/msal-browser';

// Functions to read & write from storage.
// Notes : local storage works on Chromium but not on Firefox if "Delete
// cookies and site data when Firefox is closed" is selected (for more
// details, see https://bugzilla.mozilla.org/show_bug.cgi?id=1453699)
const writeToStorage = (key, value) => {
  localStorage.setItem(key, value);
};
const readFromStorage = (key) => {
  return localStorage.getItem(key);
};
const clearFromStorage = (key) => {
  localStorage.removeItem(key);
};

export const name = 'auth-keycloakRedirectExperimental';
const authData = {
  authenticated: readFromStorage('authAuthenticated') === 'true',
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
  //
  // if (await isUserSignedIn()) {
  //   console.log('already signed in!');
  // }
};

const checkInit = () => {
  if (msalApp === null) {
    console.error(
      'AuthMSAL module has not been initialized. Make sure you ' +
        'call the setConfig const when =  you add the AuthMSAL provider.'
    );
    return false;
  }
  return true;
};

const redirectOnAuthSuccess = () => {
  window.location.href = config?.msalConfig?.auth?.redirectUri ?? '/';
};

const _acquireTokensByRequestAndAccount = async (tokenReq, account) => {
  if (!tokenReq) {
    console.warn('No base access token request provided');
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
          .catch((tokenRedirectError) => tokenRedirectError); // Token retrieval failed
      }
      throw silentTokenFetchError;
    });
};

export const acquireTokens = async () => {
  if (!checkInit()) return;

  const idToken = readFromStorage('authIdToken');
  const accessToken = readFromStorage('authAccessToken');
  const authenticated = readFromStorage('authAuthenticated') === 'true';
  if (authenticated && idToken != null && accessToken != null) {
    return { accessToken, idToken };
  }

  const account = msalApp.getAllAccounts()?.[0];
  const tokenReq = config.accessRequest;
  if (account === undefined) {
    return undefined;
  }

  return await _acquireTokensByRequestAndAccount(tokenReq, account);
};

export const acquireTokensByRequest = async (tokenReq) => {
  if (!checkInit()) return;

  const account = msalApp.getAllAccounts()?.[0];
  return await _acquireTokensByRequestAndAccount(tokenReq, account);
};

const handleResponse = (response) => {
  if (response !== null) {
    const accountId = response.account.homeAccountId;
    writeToStorage('authIdTokenPopup', response.idToken);
    writeToStorage('authIdToken', response.idToken);
    writeToStorage('authAccessToken', response.accessToken);
    writeToStorage('authAuthenticated', 'true');
    authData.authenticated = true;
    const account = response.account;
    authData.accountId = account.homeAccountId;
    authData.userEmail = account.username; // In MSAL account data, username property contains user email
    authData.username = account.name;
    authData.userId = account.localAccountId;
    redirectOnAuthSuccess();
    return;
  }

  // In case multiple accounts exist, you can select
  const currentAccounts = msalApp.getAllAccounts();

  if (currentAccounts.length === 0) {
    // no accounts signed-in, attempt to sign a user in
    msalApp.loginRedirect(config.loginRequest);
  } else if (currentAccounts.length > 1) {
    // Add choose account code here
  } else if (currentAccounts.length === 1) {
    const accountId = currentAccounts[0].homeAccountId;
  }
};

export const signIn = async () => {
  if (!checkInit()) return;

  // Force removal of MSAL interaction status if it exists in session storage (it happens sometimes after logout)
  // const itemKey = 'msal.interaction.status';
  // if (sessionStorage.getItem(itemKey)) {
  //   sessionStorage.removeItem(itemKey);
  // }

  msalApp.handleRedirectPromise().then(handleResponse);
};

export const signOut = () => {
  if (!checkInit()) return;

  clearFromStorage('authIdTokenPopup');
  clearFromStorage('authIdToken');
  clearFromStorage('authAccessToken');
  writeToStorage('authAuthenticated', 'false');
  // return;
  const logoutRequest = {
    account: msalApp.getAccountByHomeId(authData.accountId),
  };
  msalApp.logoutRedirect(logoutRequest);
};

// Returns a boolean value, stating whether the isUserSignedIn must be provided a callback
export const isAsync = () => {
  return false;
};

const _extractRolesFromAccessToken = (accessToken) => {
  let result = [];
  if (accessToken) {
    const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
    if (decodedToken?.roles) {
      result = decodedToken?.roles;
    }
  }
  return result;
};

export const isUserSignedIn = async () => {
  // Return true if already authenticated
  if (authData.authenticated) return true;
  if (readFromStorage('authAuthenticated') === 'true') {
    authData.authenticated = true;
    return true;
  }

  // Otherwise, try to acquire a token silently to implement SSO
  const tokens = await acquireTokens();
  if (tokens?.idToken !== undefined) {
    writeToStorage('authIdToken', tokens.idToken);
  }
  if (tokens?.accessToken !== undefined) {
    const accessToken = tokens.accessToken;
    authData.roles = _extractRolesFromAccessToken(accessToken);
    writeToStorage('authAccessToken', accessToken);
    return true;
  }
  return false;
};

export const getUserEmail = () => {
  if (!checkInit()) return;
  // Note: account data from MSAL seems to contain user email in the 'username' property
  return authData?.userEmail ?? msalApp.getAllAccounts()?.[0]?.username;
};

export const getUserName = () => {
  if (!checkInit()) return;
  return authData?.name ?? msalApp.getAllAccounts()?.[0]?.name;
};

export const getUserId = () => {
  if (!checkInit()) return;
  return authData?.userId ?? msalApp.getAllAccounts()?.[0]?.localAccountId;
};

export const getUserRoles = () => {
  if (!checkInit()) return;
  return authData.roles;
};

export const getUserPicUrl = () => {
  return undefined;
};

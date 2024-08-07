// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

function readFromStorage(key) {
  return localStorage.getItem(key);
}

const name = 'auth-dev';
let authData = null;

const DEFAULT_AUTH_DATA = {
  authenticated: true,
  accountId: 'xxxxxxxx-xxxx-dave-xxxx-xxxxxxxxxxxx',
  userEmail: 'dev.sample.webapp@example.com',
  userId: 'xxxxxxxx-xxxx-dave-xxxx-xxxxxxxxxxxx',
  userName: 'Dave Lauper',
  roles: ['Organization.User'],
};

// Optional configuration method to overwrite default values such as accountId, userEmail, userId, userName and roles
function setConfig(authDataPatch) {
  authData = {
    ...DEFAULT_AUTH_DATA,
    ...authDataPatch,
  };
}

function setDefaultUser() {
  if (authData != null) return;
  authData = DEFAULT_AUTH_DATA;
}

function signIn() {
  setDefaultUser();
  window.location.href = '/';
}

function signOut() {
  authData = null;
  window.location.href = '/';
}

function isAsync() {
  return false;
}

function isUserSignedIn() {
  setDefaultUser();
  return true;
}

function getUserEmail() {
  return authData?.userEmail;
}

function getUserName() {
  return authData?.userName;
}

function acquireTokens() {
  const accessToken = readFromStorage('authAccessToken');
  return accessToken ? { accessToken } : undefined;
}

function acquireTokensByRequest(tokenReq) {
  const accessToken = readFromStorage('authAccessToken');
  return accessToken ? { accessToken } : undefined;
}

function getUserId() {
  if (authData) {
    return authData.userId;
  }
  return undefined;
}

function getUserRoles() {
  return authData?.roles;
}

function getUserPicUrl() {
  return undefined;
}

const AuthDev = {
  name,
  signIn,
  signOut,
  isUserSignedIn,
  getUserEmail,
  getUserName,
  getUserRoles,
  getUserId,
  getUserPicUrl,
  isAsync,
  setConfig,
  acquireTokens,
  acquireTokensByRequest,
};
export default AuthDev;

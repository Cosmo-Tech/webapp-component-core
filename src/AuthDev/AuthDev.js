// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

function readFromStorage(key) {
  return localStorage.getItem(key);
}

const name = 'auth-dev';
let authData = null;

function setDefaultUser() {
  authData = {
    authenticated: true,
    accountId: 'xxxxxxxx-xxxx-dave-xxxx-xxxxxxxxxxxx',
    userEmail: '931b8189-2157-4102-9fee-3bc06a46d3a8',
    userId: '931b8189-2157-4102-9fee-3bc06a46d3a8',
    userName: 'Dave Lauper',
    roles: ['Organization.User'],
  };
}

function signIn() {
  setDefaultUser();
  console.log('setting default user');
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
  acquireTokens,
  acquireTokensByRequest,
};
export default AuthDev;

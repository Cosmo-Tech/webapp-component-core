// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import { OAuth2Client, generateCodeVerifier } from '@badgateway/oauth2-client';

const name = 'auth-okta';
const authData = {
  authenticated: false,
  accountId: undefined,
  userEmail: undefined,
  username: undefined,
  userId: undefined,
  roles: [],
};
let token = null;

async function setConfig(newConfig) {
  console.log('=======');
  console.log(0);
  const client = new OAuth2Client({
    server: 'https://cosmotech-dev.oktapreview.com',
    clientId: '0oa3pubnu7nRvCLKc0x7',
    tokenEndpoint: 'https://cosmotech-dev.oktapreview.com/oauth2/v1/token',
    authorizationEndpoint: 'https://cosmotech-dev.oktapreview.com/oauth2/v1/authorize',
  });

  console.log(1);
  const codeVerifier = await generateCodeVerifier();
  console.log(2);
  document.location = await client.authorizationCode.getAuthorizeUri({
    redirectUri: `${window.location.protocol}//${window.location.host}${process.env?.PUBLIC_URL ?? ''}/sign-in`,
    state: 'some-string',
    codeVerifier,
    scope: ['openid', 'profile', 'email'],
  });

  console.log(3);
  const oauth2Token = await client.authorizationCode.getTokenFromCodeRedirect(document.location, {
    redirectUri: `${window.location.protocol}//${window.location.host}${process.env?.PUBLIC_URL ?? ''}/sign-in`,
    state: 'some-string',
    codeVerifier,
  });
  token = oauth2Token;
  console.log(oauth2Token);
  console.log(4);
}

function checkInit() {
  return true;
}

async function acquireTokens() {
  console.log('acquireTokens');
}

async function acquireTokensByRequest(tokenReq) {
  console.log('acquireTokensByRequest');
}

function signIn() {
  console.log(signIn);
}

function signOut() {
  console.log(signOut);
}

function isAsync() {
  return false;
}

async function isUserSignedIn() {
  console.log(isUserSignedIn);
  return token != null;
}

function getUserEmail() {
  if (!checkInit()) {
    return undefined;
  }
  // Note: account data from MSAL seems to contain user email in the 'username' property
  return authData?.userEmail;
}

function getUserName() {
  if (!checkInit()) {
    return undefined;
  }
  return authData?.name;
}

function getUserId() {
  if (!checkInit()) {
    return undefined;
  }
  return authData?.userId;
}

function getUserRoles() {
  if (!checkInit()) {
    return undefined;
  }
  return authData?.roles;
}

function getUserPicUrl() {
  return undefined;
}

const AuthOkta = {
  name,
  signIn,
  signOut,
  isUserSignedIn,
  getUserEmail,
  getUserName,
  getUserId,
  getUserRoles,
  getUserPicUrl,
  isAsync,
  setConfig,
  acquireTokens,
  acquireTokensByRequest,
};
export default AuthOkta;

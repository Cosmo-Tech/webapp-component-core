// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

const name = 'auth-dev'
let authData = null

function setDefaultUser () {
  authData = {
    userId: 1,
    userName: 'le dev'
  }
}

function signIn () {
  setDefaultUser()
  window.location.href = '/'
}

function signOut () {
  window.location.href = '/'
}

function isAsync () {
  return true
}

// TODO: use Error-First Callback pattern (warning: doing so may break
// compatibility with existing apps)
function isUserSignedIn (callbackFunction) {
  setDefaultUser()
  callbackFunction(authData !== null)
}

function getUserName () {
  if (authData) {
    return authData.userName
  }
  return undefined
}

function getUserId () {
  if (authData) {
    return authData.userId
  }
  return undefined
}

function getUserPicUrl () {
  return undefined
}

const AuthDev = {
  name,
  signIn,
  signOut,
  isUserSignedIn,
  getUserName,
  getUserId,
  getUserPicUrl,
  isAsync
}
export default AuthDev

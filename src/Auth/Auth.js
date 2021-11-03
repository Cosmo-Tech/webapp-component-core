// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

// Functions to read & write from storage.
// Notes : local storage works on Chromium but not on Firefox if "Delete
// cookies and site data when Firefox is closed" is selected (for more
// details, see https://bugzilla.mozilla.org/show_bug.cgi?id=1453699)
function writeToStorage(key, value) {
  localStorage.setItem(key, value);
}
function readFromStorage(key) {
  return localStorage.getItem(key);
}
function clearFromStorage(key) {
  localStorage.removeItem(key);
}

// Currently selected provider
let currentProvider;
// Dict of registered providers
const providers = {};
// List of callbacks to call on authentication data change
const onAuthChangeCallbacks = [];

function addProvider(newProvider) {
  // Check that provider name is defined
  if (newProvider.name === undefined) {
    console.error(
      'Trying to add a provider without name. Please make sure ' + 'that the provider name is defined and exported.'
    );
    return null;
  } else if (providers[newProvider.name] !== undefined) {
    // Do nothing if provider already exists
    console.warn('Provider "' + newProvider.name + '" already exists');
  } else {
    // Otherwise, store new provider
    providers[newProvider.name] = newProvider;
  }
  return providers[newProvider.name];
}

function setProvider(providerName) {
  // Set new provider if it exists
  if (providers[providerName] === undefined) {
    console.error(
      'Provider "' +
        providerName +
        '" does not exist, you have ' +
        'to register authentication providers with "addProvider" function ' +
        'before using them'
    );
    currentProvider = undefined;
  } else {
    currentProvider = providers[providerName];
    // Update callbacks for the new provider
    if (currentProvider.setAuthChangeCallbacks) {
      currentProvider.setAuthChangeCallbacks(onAuthChangeCallbacks);
    }
    // Store the provider used in local storage
    writeToStorage('authProvider', providerName);
  }
}

// If no provider is currently selected but local storage has the information
// of a provider used (in another tab or before a page refresh, for instance),
// this provider will be selected
function initProviderIfNull() {
  if (currentProvider === undefined) {
    const newProviderName = readFromStorage('authProvider');
    if (newProviderName !== undefined && newProviderName !== null) {
      setProvider(newProviderName);
    }
  }
}

function signIn() {
  return currentProvider.signIn();
}

function signOut() {
  initProviderIfNull();
  // Clear last auth provider used from local storage
  clearFromStorage('authProvider');
  return currentProvider.signOut();
}

function onAuthStateChanged(newCallback) {
  onAuthChangeCallbacks.push(newCallback);
}

function isAsync() {
  initProviderIfNull();
  if (currentProvider && currentProvider.isAsync) {
    return currentProvider.isAsync();
  }

  return false;
}

function acquireTokens(callback) {
  initProviderIfNull();
  if (currentProvider === undefined) {
    return undefined;
  }
  return currentProvider.acquireTokens(callback);
}

function acquireTokensByRequest(tokenReq, callback) {
  initProviderIfNull();
  if (currentProvider === undefined) {
    return undefined;
  }
  return currentProvider.acquireTokensByRequest(tokenReq, callback);
}

function isUserSignedIn(callback) {
  initProviderIfNull();
  if (currentProvider === undefined) {
    return false;
  }
  return currentProvider.isUserSignedIn(callback);
}

function getUserName() {
  if (currentProvider === undefined) {
    return undefined;
  }
  return currentProvider.getUserName();
}

function getUserId() {
  if (currentProvider === undefined) {
    return undefined;
  }
  return currentProvider.getUserId();
}

function getUserPicUrl() {
  if (currentProvider === undefined) {
    return undefined;
  }
  return currentProvider.getUserPicUrl();
}

const Auth = {
  addProvider,
  setProvider,
  signIn,
  signOut,
  onAuthStateChanged,
  isUserSignedIn,
  getUserName,
  getUserId,
  getUserPicUrl,
  isAsync,
  acquireTokens,
  acquireTokensByRequest,
};
export default Auth;

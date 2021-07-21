// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import Auth from "../../Auth";

const signIn = async (callback) => {
    if (Auth.isAsync()) {
        return Auth.isUserSignedIn(callback);
    } else {
        return Auth.isUserSignedIn();
    }
};

// Configure OAuth2 access token for authorization: oAuth2AuthCode
function setAccessToken (apiService, token) {
    apiService.ApiClient.instance.authentications.oAuth2AuthCode.accessToken = token;
}

function resetAccessToken (apiService) {
    // Use a non-empty string to be compatible with the expected API format
    // when using a local mock server in dev mode
    apiService.ApiClient.instance.authentications.oAuth2AuthCode.accessToken = 'none';
}

const getDefaultBasePath = (apiService) => apiService.ApiClient.instance.basePath;

const ApiUtils = {
    signIn,
    setAccessToken,
    resetAccessToken,
    getDefaultBasePath
};

export default ApiUtils;

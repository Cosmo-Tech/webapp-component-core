// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import Auth from "../Auth";

const signIn = async (callback) => {
    if (Auth.isAsync()) {
        return Auth.isUserSignedIn(callback);
    } else {
        return Auth.isUserSignedIn();
    }
};

const SignInUtils = {
    signIn
};

export default SignInUtils;

export const AUTH = 'AUTH';
export const PROFILE = 'PROFILE';

export const setAuth = (secretKey) => ({
    type: AUTH,
    payload: secretKey
});

export const setProfile = (secretKey) => ({
    type: PROFILE,
    payload: secretKey
});



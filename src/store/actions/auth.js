import * as actionType from './actionTypes';
import axios from '../../axios-orders';

export const authStart = () => {
    return {
        type: actionType.AUTH_START
    };
}

export const authSuccess = (token, userId) => {
    return {
        type: actionType.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionType.AUTH_FAIL,
        error: error
    };
};

export const authLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    return {
        type: actionType.AUTH_LOGOUT
    };
};

export const checkAuthTimeOut = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogOut());
        }, 360000)
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            retrunSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLH_oQjugM9Ckcd1W9OrYtEhwhpfkQyHo';
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLH_oQjugM9Ckcd1W9OrYtEhwhpfkQyHo';
        }
        axios.post(url, authData)
            .then(
                response => {
                    //console.log(response);
                    const expirationDate = new Date (new Date().getTime() + 36000)
                    localStorage.setItem('token', response.data.idToken)
                    localStorage.setItem('expirationDate', expirationDate);
                    dispatch(authSuccess(response.data.idToken, response.data.userId));
                    dispatch(checkAuthTimeOut());
                }
            )
            .catch(err => {
               // console.log(err);
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionType.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogOut())

        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            //if()
            dispatch(authSuccess())
        }
    }
}
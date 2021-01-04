import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("expirationDate");
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = (expirationDate) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationDate * 1000);
    };
};

export const authLogin = (email, password) => {
    return (dispatch) => {
        dispatch(authStart());
        axios
            .post("http://127.0.0.1:8000/rest-auth/login/", {
                email: email,
                password: password,
            })
            .then((res) => {
                const token = res.data.key;
                const expirationDate = new Date(
                    new Date().getTime() + 3600 * 1000
                );
                localStorage.setItem("token", token);
                localStorage.setItem("expirationDate", expirationDate);
                dispatch(authSuccess(token));
            })
            .catch((err) => {
                let msg = "";
                if (err === "Error: Network Error") {
                    msg = "Network Error: Check if backend is working";
                } else {
                    msg = err.response.data["non_field_errors"];
                }
                dispatch(authFail(msg));
            });
    };
};

export const authSignup = (
    username,
    first_name,
    last_name,
    email,
    password,
    confirm,
    address,
    dob,
    company,
    mobile,
    city
) => {
    return (dispatch) => {
        dispatch(authStart());
        const data = {
            username: username,
            email: email,
            password1: password,
            password2: confirm,
            first_name: first_name,
            last_name: last_name,
            address: address,
            dob: dob,
            company: company,
            mobile: mobile,
            city: city,
        };
        console.log(data);
        axios.defaults.headers = {
            "Content-type": "application/json",
        };
        axios
            .post("http://127.0.0.1:8000/rest-auth/registration/", data)
            .then((res) => {
                const token = res.data.key;
                const expirationDate = new Date(
                    new Date().getTime() + 3600 * 1000
                );
                localStorage.setItem("token", token);
                localStorage.setItem("expirationDate", expirationDate);
                dispatch(authSuccess(token));
            })
            .catch((err) => {
                let msg = "";
                if (err === "Error: Network Error") {
                    msg = "Network Error: Check if backend is working";
                } else {
                    msg = err.response.data["non_field_errors"];
                }
                dispatch(authFail(msg));
            });
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem("expirationDate")
            );
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(
                    checkAuthTimeout(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                );
            }
        }
    };
};

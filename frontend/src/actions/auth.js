import {catchAPIErrors, catchServerErrors, getAPIHeaders} from "../helper";

export const loadUser = () => {
  return (dispatch, getState) => {
    dispatch({type: "USER_LOADING"});
    let headers = getAPIHeaders(getState().auth);

    return fetch("/api/auth/user/", {headers})
      .then((res) => {
        if (res.status < 500) {
          return res.json().then((data) => {
            return {status: res.status, data};
          });
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({type: "USER_LOADED", user: res.data});
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      });
  };
};

export const login = (username, password) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({username, password});

    return fetch("/api/auth/login/", {headers, body, method: "POST"})
      .then((res) => {
        if (res.status < 500) {
          return res.json().then((data) => {
            return {status: res.status, data};
          });
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({type: "LOGIN_SUCCESSFUL", data: res.data});
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        } else {
          dispatch({type: "LOGIN_FAILED", data: res.data});
          throw res.data;
        }
      });
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};

    return fetch("/api/auth/logout/", {headers, body: "", method: "POST"})
      .then(catchServerErrors)
      .then((res) => {
        if (res.status === 204) {
          dispatch({type: "LOGOUT_SUCCESSFUL"});
          return res.data;
        }
        catchAPIErrors(res, dispatch);
      });
  };
};

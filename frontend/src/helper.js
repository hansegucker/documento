function getAPIHeaders(auth) {
    let headers = {"Content-Type": "application/json"};
    let {token} = auth;

    if (token) {
        headers["Authorization"] = `Token ${token}`;
    }
    return headers;
}

function catchAPIErrors(res, dispatch) {
    if (res.status === 401 || res.status === 403) {
        dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
        throw res.data;
    }
}

function catchServerErrors(res) {
    if (res.status < 500) {
        return res.json().then(data => {
            return {status: res.status, data};
        })
    } else {
        console.log("Server Error!");
        throw res;
    }
}

export {getAPIHeaders, catchAPIErrors, catchServerErrors};
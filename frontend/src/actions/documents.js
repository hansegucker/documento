import {catchAPIErrors, catchServerErrors, getAPIHeaders} from "../helper";

export const fetchDocuments = () => {
  return (dispatch, getState) => {
    let headers = getAPIHeaders(getState().auth);

    return fetch("/api/documents/", {headers})
      .then(catchServerErrors)
      .then((res) => {
        if (res.status === 200) {
          return dispatch({type: "FETCH_DOCUMENTS", documents: res.data});
        }
        catchAPIErrors(res, dispatch);
      });
  };
};

export const addDocument = (name) => {
  return (dispatch, getState) => {
    let headers = getAPIHeaders(getState().auth);
    let body = JSON.stringify({name});

    return fetch("/api/documents/", {headers, method: "POST", body})
      .then(catchServerErrors)
      .then((res) => {
        if (res.status === 201) {
          return dispatch({
            type: "ADD_DOCUMENT",
            document: res.data,
          });
        }
        catchAPIErrors(res, dispatch);
      });
  };
};

export const updateDocument = (idx, name) => {
  return (dispatch, getState) => {
    let headers = getAPIHeaders(getState().auth);
    let body = JSON.stringify({name});
    let documentID = getState().documents[idx].id;

    return fetch(`/api/documents/${documentID}/`, {
      headers,
      method: "PUT",
      body,
    })
      .then(catchServerErrors)
      .then((res) => {
        if (res.status === 200) {
          return dispatch({
            type: "UPDATE_DOCUMENT",
            document: res.data,
            idx,
          });
        }
        catchAPIErrors(res, dispatch);
      });
  };
};

export const deleteDocument = (idx) => {
  return (dispatch, getState) => {
    let headers = getAPIHeaders(getState().auth);
    let documentID = getState().documents[idx].id;

    return fetch(`/api/documents/${documentID}/`, {headers, method: "DELETE"})
      .then((res) => {
        if (res.status === 204) {
          return {status: res.status, data: {}};
        } else if (res.status < 500) {
          return res.json().then((data) => {
            return {status: res.status, data};
          });
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then((res) => {
        if (res.status === 204) {
          return dispatch({
            type: "DELETE_DOCUMENT",
            idx,
          });
        }
        catchAPIErrors(res, dispatch);
      });
  };
};

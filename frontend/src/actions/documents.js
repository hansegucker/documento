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

export const printReport = (id, report) => {
  return (dispatch, getState) => {
    let headers = getAPIHeaders(getState().auth);

    return fetch(`/api/documents/${id}/print_report/`, {
      headers,
      method: "POST",
      body: JSON.stringify({report}),
    })
      .then(catchServerErrors)
      .then((res) => {
        catchAPIErrors(res, dispatch);
        return res.status === 200;
      });
  };
};

export const addDocument = (name, file, category) => {
  return (dispatch, getState) => {
    let headers = getAPIHeaders(getState().auth);
    delete headers["Content-Type"];

    let form_data = new FormData();
    form_data.append("name", name);
    form_data.append("category", category);
    form_data.append("file", file, file.name);

    return fetch("/api/documents/", {headers, method: "POST", body: form_data})
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

export const updateDocument = (id, name, category) => {
  return (dispatch, getState) => {
    let headers = getAPIHeaders(getState().auth);
    let body = JSON.stringify({name, category});

    return fetch(`/api/documents/${id}/`, {
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
          });
        }
        catchAPIErrors(res, dispatch);
      });
  };
};

export const deleteDocument = (id) => {
  return (dispatch, getState) => {
    let headers = getAPIHeaders(getState().auth);

    return fetch(`/api/documents/${id}/`, {headers, method: "DELETE"})
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
            id,
          });
        }
        catchAPIErrors(res, dispatch);
      });
  };
};

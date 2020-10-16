import {catchAPIErrors, catchServerErrors, getAPIHeaders} from "../helper";

export const fetchCategories = () => {
  return (dispatch, getState) => {
    let headers = getAPIHeaders(getState().auth);

    return fetch("/api/categories/", {headers})
      .then(catchServerErrors)
      .then((res) => {
        if (res.status === 200) {
          return dispatch({type: "FETCH_CATEGORIES", categories: res.data});
        }
        catchAPIErrors(res, dispatch);
      });
  };
};

export const addCategory = (name, parent) => {
  return (dispatch, getState) => {
    let headers = getAPIHeaders(getState().auth);

    let form_data = {name};
    if (parent) {
      form_data.parent = parent;
    }

    return fetch("/api/categories/", {
      headers,
      method: "POST",
      body: JSON.stringify(form_data),
    })
      .then(catchServerErrors)
      .then((res) => {
        if (res.status === 201) {
          return dispatch({
            type: "ADD_CATEGORY",
            category: res.data,
          });
        }
        catchAPIErrors(res, dispatch);
      });
  };
};

export const updateCategory = (id, name, parent) => {
  return (dispatch, getState) => {
    let headers = getAPIHeaders(getState().auth);
    let body = JSON.stringify({name, parent});

    return fetch(`/api/categories/${id}/`, {
      headers,
      method: "PUT",
      body,
    })
      .then(catchServerErrors)
      .then((res) => {
        if (res.status === 200) {
          return dispatch({
            type: "UPDATE_CATEGORY",
            category: res.data,
          });
        }
        catchAPIErrors(res, dispatch);
      });
  };
};

export const deleteCategory = (id) => {
  return (dispatch, getState) => {
    let headers = getAPIHeaders(getState().auth);

    return fetch(`/api/categories/${id}/`, {headers, method: "DELETE"})
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
            type: "DELETE_CATEGORY",
            id,
          });
        }
        catchAPIErrors(res, dispatch);
      });
  };
};

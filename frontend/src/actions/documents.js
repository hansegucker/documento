export const fetchDocuments = () => {
    return dispatch => {
        let headers = {"Content-Type": "application/json"};
        return fetch("/api/documents/", {headers,})
            .then(res => res.json())
            .then(documents => {
                return dispatch({
                    type: 'FETCH_DOCUMENTS',
                    documents
                })
            })
    }
}

export const addDocument = name => {
    return dispatch => {
        let headers = {"Content-Type": "application/json"};
        let body = JSON.stringify({name,});
        return fetch("/api/documents/", {headers, method: "POST", body})
            .then(res => res.json())
            .then(document => {
                return dispatch({
                    type: 'ADD_DOCUMENT',
                    document
                })
            });
    }
}

export const updateDocument = (idx, name) => {
  return (dispatch, getState) => {

    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({name, });
    let documentID = getState().documents[idx].id;

    return fetch(`/api/documents/${documentID}/`, {headers, method: "PUT", body})
      .then(res => res.json())
      .then(document => {
        return dispatch({
          type: 'UPDATE_DOCUMENT',
          document,
          idx
        })
      })
  }
}

export const deleteDocument = idx => {
  return (dispatch, getState) => {

    let headers = {"Content-Type": "application/json"};
    let documentID = getState().documents[idx].id;

    return fetch(`/api/documents/${documentID}/`, {headers, method: "DELETE"})
      .then(res => {
        if (res.ok) {
          return dispatch({
            type: 'DELETE_DOCUMENT',
            idx
          })
        }
      })
  }
}
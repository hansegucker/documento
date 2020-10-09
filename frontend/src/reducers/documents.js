const initialState = {};

export default function documents(state = initialState, action) {
  let documentObj = {...state};
  switch (action.type) {
    case "FETCH_DOCUMENTS":
      let newState = {};
      for (let document of action.documents) {
        newState[document.id] = document;
      }
      return newState;
    case "ADD_DOCUMENT":
      return {...state, [action.document.id]: action.document};
    case "UPDATE_DOCUMENT":
      let documentToUpdate = documentObj[action.document.id];
      documentToUpdate.name = action.document.name;
      return {...state, [action.document.id]: documentToUpdate};
    case "DELETE_DOCUMENT":
      delete documentObj[action.id];
      return documentObj;
    default:
      return state;
  }
}

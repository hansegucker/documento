import {DDocument} from "../types";

const initialState: {[key: number]: DDocument} = {};

export default function documents(
  state = initialState,
  action: {
    type: string;
    documents?: DDocument[];
    document?: DDocument;
    id?: number;
  }
) {
  let documentObj = {...state};
  switch (action.type) {
    case "FETCH_DOCUMENTS":
      let newState: {[key: number]: DDocument} = {};
      // @ts-ignore
      for (let document of action.documents) {
        newState[document.id] = document;
      }
      return newState;
    case "ADD_DOCUMENT":
      // @ts-ignore
      return {...state, [action.document.id]: action.document};
    case "UPDATE_DOCUMENT":
      // @ts-ignore
      return {...state, [action.document.id]: action.document};
    case "DELETE_DOCUMENT":
      // @ts-ignore
      delete documentObj[action.id];
      return documentObj;
    default:
      return state;
  }
}

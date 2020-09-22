import { combineReducers } from 'redux';
import documents from "./documents";
import auth from "./auth";

const documentoApp = combineReducers({
  documents, auth
})

export default documentoApp;
import { combineReducers } from 'redux';
import documents from "./documents";
import auth from "./auth";
import locale from "./locale";

const documentoApp = combineReducers({
  documents, auth, locale
})

export default documentoApp;
import { combineReducers } from 'redux';
import documents from "./documents";


const documentoApp = combineReducers({
  documents,
})

export default documentoApp;
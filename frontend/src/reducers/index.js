import {combineReducers} from "redux";
import documents from "./documents";
import auth from "./auth";
import locale from "./locale";
import categories from "./categories";

const documentoApp = combineReducers({
  documents,
  auth,
  locale,
  categories,
});

export default documentoApp;

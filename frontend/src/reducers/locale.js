import {locales} from "../helper";

const initialState = locales["en"];

export default function locale(state = initialState, action) {
  switch (action.type) {
    case "SWITCH_LOCALE":
      return {
        ...state,
        ...locales[action.id],
      };
    default:
      return state;
  }
}

import {locales} from "../helper";

const browserLang = navigator.language || navigator.userLanguage;

let defaultLocale = locales["en"];
if (browserLang in locales) {
  defaultLocale = locales[browserLang];
}

export default function locale(state = defaultLocale, action) {
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

import {locales} from "../helper";

const browserLang = navigator.language;

let defaultLocale = locales["en"];
if (browserLang in locales) {
  defaultLocale = locales[browserLang];
}

export default function locale(
  state = defaultLocale,
  action: {type: string; id: string}
) {
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

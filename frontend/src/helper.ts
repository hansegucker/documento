import {Auth, Locale, Messages} from "./types";
import {Dispatch} from "redux";

function getAPIHeaders(auth: Auth): Headers {
  let headers = new Headers({"Content-Type": "application/json"});
  let {token} = auth;

  if (token) {
    headers.append("Authorization", `Token ${token}`);
  }
  return headers;
}

function catchAPIErrors(
  res: {status: number; data: object},
  dispatch: Dispatch
) {
  if (res.status === 401 || res.status === 403) {
    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
    throw res.data;
  }
}

function catchServerErrors(res: Response) {
  if (res.status < 500) {
    return res.json().then((data: object) => {
      return {status: res.status, data};
    });
  } else {
    console.log("Server Error!");
    throw res;
  }
}

const locales: {[key: string]: Locale} = {
  en: {
    id: "en",
    shortcode: "EN",
    name: "English",
    flag: "GB.svg",
    path: () => import("./lang/en.json"),
  },
  de: {
    id: "de",
    shortcode: "DE",
    name: "Deutsch",
    flag: "DE.svg",
    path: () => import("./lang/de.json"),
  },
};

async function loadLocaleData() {
  let messages: Messages = {};
  for (let locale of Object.values(locales)) {
    let loadedMessages = await locale.path();
    messages[locale.id] = loadedMessages["default"];
    console.log(messages[locale.id]);
  }
  return messages;
}

export {
  getAPIHeaders,
  catchAPIErrors,
  catchServerErrors,
  loadLocaleData,
  locales,
};

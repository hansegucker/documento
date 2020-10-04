function getAPIHeaders(auth) {
  let headers = {"Content-Type": "application/json"};
  let {token} = auth;

  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }
  return headers;
}

function catchAPIErrors(res, dispatch) {
  if (res.status === 401 || res.status === 403) {
    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
    throw res.data;
  }
}

function catchServerErrors(res) {
  if (res.status < 500) {
    return res.json().then((data) => {
      return {status: res.status, data};
    });
  } else {
    console.log("Server Error!");
    throw res;
  }
}

const locales = {
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

async function loadLocaleData(locale) {
  let messages = {};
  for (locale of Object.values(locales)) {
    messages[locale.id] = await locale.path();
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

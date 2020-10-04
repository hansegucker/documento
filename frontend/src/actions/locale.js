export const switchLocale = (id) => {
  return (dispatch, getState) => {
    return dispatch({type: "SWITCH_LOCALE", id: id});
  };
};

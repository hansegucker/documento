const initialState = {};

export default function categories(state = initialState, action) {
  let categoryObj = {...state};

  const getParents = (category, categories) => {
    let currentCategory = category;
    let parents = [];
    while (currentCategory.parent) {
      console.log(currentCategory);
      parents.unshift(categories[currentCategory.parent]);

      currentCategory = categories[currentCategory.parent];
    }
    console.log(parents);
    return parents;
  };
  switch (action.type) {
    case "FETCH_CATEGORIES":
      let newState = {};
      for (let category of action.categories) {
        newState[category.id] = category;
      }
      for (let category of action.categories) {
        newState[category.id].parents = getParents(category, newState);
      }
      return newState;
    case "ADD_CATEGORY":
      action.category.parents = getParents(action.category, state);
      return {...state, [action.category.id]: action.category};
    case "UPDATE_CATEGORY":
      action.category.parents = getParents(action.category, state);
      return {...state, [action.category.id]: action.category};
    case "DELETE_CATEGORY":
      delete categoryObj[action.id];
      return categoryObj;
    default:
      return state;
  }
}
